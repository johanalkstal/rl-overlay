import { readable, writable } from 'svelte/store';
import { subscribe, unsubscribe } from './rl-relay-client';
import { CHANNELS, GAME_EVENTS } from './constants';

const defaultGameSettings = () => ({
	bestOfMatches: 1,
	blueTeamLogo: '',
	blueTeamName: 'Blue team',
	orangeTeamLogo: '',
	orangeTeamName: 'Orange team',
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
export const gameSettings = writable(defaultGameSettings());

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
