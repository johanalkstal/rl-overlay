import { error, info, log, success, warn } from 'cli-msg';
import WS from 'ws';
import { CHANNELS, RELAY_SERVER_EVENTS, RELAY_SERVER_PORT } from './constants';

/**
 * All web socket connections.
 */
const CONNECTIONS = {};

/**
 * How long it should wait before attempting to connect to Rocket League again.
 */
const RECONNECT_DELAY_MS = 10000;

/**
 * The host that Rocket League is running on.
 */
const ROCKET_LEAGUE_HOST = 'localhost:49122';

/**
 * The connection id used to identify Rocket League messages.
 */
const ROCKET_LEAGUE_ID = 'Rocket League';

/**
 * Starts the web socket server and Rocket League connection.
 */
export function connect() {
	initWebSocketServer();
	initRocketLeagueWebSocketClient();
}

/**
 * Sends messages to all connections.
 */
function broadcastMessage({ senderConnectionId, message }) {
	const { data: messageData, event: messageEvent } = JSON.parse(message);
	// UNCOMMENT TO LOG MESSAGES.
	// if (messageEvent !== 'game:update_state') {
	// 	log.wb(`${senderConnectionId} sent ${messageEvent} event.`);
	// }

	const [channel, event] = messageEvent.split(':');

	if (channel === CHANNELS.RELAY_SERVER) {
		updateSubscriptions({
			connectionId: senderConnectionId,
			channelEvent: event,
			eventToSubscribe: messageData,
		});
		return;
	}

	sendToConnections({
		senderConnectionId,
		event: messageEvent,
		message: JSON.stringify({
			channel,
			event,
			data: messageData,
		}),
	});
}

/**
 * The web socket server that the overlay application communicates with.
 */
function initWebSocketServer() {
	const wsServer = new WS.Server({ port: RELAY_SERVER_PORT });

	info.wb(`WebSocker server opened on port ${RELAY_SERVER_PORT}.`);

	wsServer.on('connection', (webSocket) => {
		const connectionId = Date.now();
		saveConnection({ connectionId, webSocket });

		webSocket.on('message', (message) => {
			broadcastMessage({ senderConnectionId: connectionId, message });
		});

		webSocket.on('close', () => {
			warn.wb(`Connnection ${connectionId} was closed.`);
			removeConnection(connectionId);
		});

		success.wb(`Connection with id ${connectionId} established.`);
	});
}

/**
 * The web socket client that communicates with Rocket League.
 */
function initRocketLeagueWebSocketClient() {
	let wsClient;

	function init() {
		wsClient = new WS(`ws://${ROCKET_LEAGUE_HOST}`);

		wsClient.onopen = () => {
			success.wb(`Connected to Rocket League on ${ROCKET_LEAGUE_HOST}.`);
		};

		wsClient.onclose = () => {
			// info.wb('Connection to Rocket League is closed.');
		};

		wsClient.onmessage = (message) => {
			broadcastMessage({
				senderConnectionId: ROCKET_LEAGUE_ID,
				message: message.data,
			});
		};

		wsClient.onerror = (err) => {
			error.wb(
				`Error connecting to Rocket League on ${ROCKET_LEAGUE_HOST}. Error message: ${err.message}.`,
			);
		};
	}

	init();

	setInterval(() => {
		if (wsClient && wsClient.readyState === WS.CLOSED) {
			warn.wb(`Rocket League WebSocket is closed. Attempting to reconnect.`);
			init();
		}
	}, RECONNECT_DELAY_MS);
}

function removeConnection(connectionId) {
	delete CONNECTIONS[connectionId];
}

function saveConnection({ connectionId, webSocket }) {
	CONNECTIONS[connectionId] = {
		webSocket,
		subscriptions: [],
	};
}

function sendToConnections({ senderConnectionId, event, message }) {
	Object.keys(CONNECTIONS).forEach((connectionId) => {
		if (senderConnectionId === connectionId) {
			return;
		}

		if (CONNECTIONS[connectionId].subscriptions.includes(event)) {
			try {
				CONNECTIONS[connectionId].webSocket.send(message);
			} catch (err) {
				error.wb(`Error when sending message to ${connectionId}.`);
			}
		}
	});
}

function updateSubscriptions({ connectionId, channelEvent, eventToSubscribe }) {
	if (channelEvent === RELAY_SERVER_EVENTS.SUBSCRIBE) {
		const isAlreadySubscribed = CONNECTIONS[
			connectionId
		].subscriptions.includes(eventToSubscribe);

		if (isAlreadySubscribed) {
			warn.wb(`${connectionId} is already subscribed to ${eventToSubscribe}`);
			return;
		}

		CONNECTIONS[connectionId].subscriptions.push(eventToSubscribe);
		info.wb(`${connectionId} subscribed to ${eventToSubscribe}.`);
		return;
	}

	if (channelEvent === RELAY_SERVER_EVENTS.UNSUBSCRIBE) {
		const subIndex = CONNECTIONS[connectionId].subscriptions.indexOf(
			eventToSubscribe,
		);
		const isNotSubscribed = subIndex === -1;

		if (isNotSubscribed) {
			warn.wb(
				`${connectionId} is not subscribed to receive ${eventToSubscribe} and cannot unsubscribe.`,
			);
			return;
		}

		CONNECTIONS[connectionId].subscriptions.splice(subIndex, 1);
		info.wb(`${connectionId} unsubscribed from ${eventToSubscribe}`);
	}
}
