import { CHANNELS, RELAY_SERVER_EVENTS, RELAY_SERVER_PORT } from './constants';

let hasRelayConnection = false;
const SUBSCRIBERS = {};
let relayRegisterQueue = [];
let webSocket;

/**
 * Sends messages back to the WebSocket relay.
 */
function callRelay({ channel, event, data }) {
	if (channel === 'local') {
		callSubscribers({ channel, event, data });
		return;
	}

	if (webSocket) {
		webSocket.send(
			JSON.stringify({
				event: `${channel}:${event}`,
				data,
			}),
		);
	}
}

/**
 * Calls all registered subscribers.
 */
function callSubscribers({ channel, event, data }) {
	if (SUBSCRIBERS[channel] && SUBSCRIBERS[channel][event]) {
		SUBSCRIBERS[channel][event].forEach((callback) => callback(data));
	}
}

/**
 * Connects to the relay WebSocket.
 */
export function connect({ port = RELAY_SERVER_PORT } = {}) {
	webSocket = new window.WebSocket(`ws://localhost:${port}`);

	webSocket.onmessage = (e) => {
		const { channel, data, event } = JSON.parse(e.data);

		if (!event) {
			return;
		}

		callSubscribers({ channel, event, data });
	};

	webSocket.onopen = () => {
		callSubscribers({ channel: 'ws', event: 'open' });
		hasRelayConnection = true;
		relayRegisterQueue.forEach((data) =>
			callRelay({
				channel: CHANNELS.RELAY_SERVER,
				event: RELAY_SERVER_EVENTS.SUBSCRIBE,
				data,
			}),
		);
		relayRegisterQueue = [];
	};

	webSocket.onerror = () => {
		callSubscribers({ channel: 'ws', event: 'error' });
		hasRelayConnection = false;
	};

	webSocket.onclose = () => {
		callSubscribers({ channel: 'ws', event: 'close' });
		hasRelayConnection = false;
	};
}

/**
 * Adds subscribers to relay messages.
 */
export function subscribe({ channels, events, callback }) {
	const channelsToSubscribe = Array.isArray(channels) ? channels : [channels];
	const eventsToSubscribe = Array.isArray(events) ? events : [events];

	channelsToSubscribe.forEach((channel) => {
		if (!SUBSCRIBERS[channel]) {
			SUBSCRIBERS[channel] = {};
		}

		eventsToSubscribe.forEach((event) => {
			const hasSubscribers =
				SUBSCRIBERS[channel][event] && SUBSCRIBERS[channel][event].length;

			if (!hasSubscribers) {
				SUBSCRIBERS[channel][event] = [];
			}

			if (!hasRelayConnection) {
				relayRegisterQueue.push(`${channel}:${event}`);
				return;
			}

			SUBSCRIBERS[channel][event].push(callback);

			callRelay({
				channel: CHANNELS.RELAY_SERVER,
				event: RELAY_SERVER_EVENTS.SUBSCRIBE,
				data: `${channel}:${event}`,
			});
		});
	});
}

/**
 * Removes all subscribers of an event.
 */
export function unsubscribe({ channel, event }) {
	if (SUBSCRIBERS[channel]) {
		SUBSCRIBERS[channel][event] = [];
		callRelay({
			channel: CHANNELS.RELAY_SERVER,
			event: RELAY_SERVER_EVENTS.UNSUBSCRIBE,
			data: `${channel}:${event}`,
		});
	}
}
