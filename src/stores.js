import { get, readable, writable } from 'svelte/store';
import { subscribe, unsubscribe } from './rl-relay-client';
import { CHANNELS, GAME_EVENTS } from './constants';

const defaultGameSettings = () => ({
	bestOfMatches: 1,
	blueTeamLogo: 'blue',
	blueTeamWins: 0,
	logos: ['blue', 'orange'],
	orangeTeamLogo: 'orange',
	orangeTeamWins: 0,
	title: '',
});

const defaultGameState = () => ({
	game: {
		teams: [{ score: 0 }, { score: 0 }],
	},
	hasGame: false,
	players: {},
});

const defaultStatsFeed = () => ({
	mainTarget: '',
	secondaryTarget: '',
	type: '',
});

/**
 *  A writable store for game settings controlled by the dashboard.
 */
export const gameSettings = localStorageStore(
	'rlOverlay',
	defaultGameSettings(),
);

/**
 * A read only store that subscribes to game updates.
 */
export const gameState = readable(defaultGameState(), function start(set) {
	subscribe({
		channels: CHANNELS.GAME,
		events: GAME_EVENTS.UPDATE_STATE,
		callback: (data) => {
			set(data);
		},
	});

	return function stop() {
		unsubscribe({ channel: CHANNELS.GAME, event: GAME_EVENTS.UPDATE_STATE });
	};
});

/**
 * A read only store of the stat feed that shows things like shots, saves etc.
 */
export const statsFeed = readable(defaultStatsFeed(), function start(set) {
	subscribe({
		channels: CHANNELS.GAME,
		events: GAME_EVENTS.STATFEED_EVENT,
		callback: (data) => {
			set({
				mainTarget: data.main_target,
				secondaryTarget: data.secondary_target,
				type: data.type,
			});
		},
	});

	return function stop() {
		unsubscribe({ channel: CHANNELS.GAME, event: GAME_EVENTS.STATFEED_EVENT });
	};
});

function localStorageStore(key, initialValue) {
	const store = writable(initialValue);
	const { subscribe: storeSubscribe, set } = store;
	const hasWindow = typeof window !== 'undefined';

	if (hasWindow) {
		const data = window ? window.localStorage.getItem(key) : undefined;

		if (data) {
			set(JSON.parse(data));
		}
	}

	return {
		set(value) {
			if (hasWindow) {
				window.localStorage.setItem(key, JSON.stringify(value));
			}
			set(value);
		},
		update(updateFunc) {
			const value = updateFunc(get(store));
			this.set(value);
		},
		subscribe: storeSubscribe,
	};
}
