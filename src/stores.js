import { readable, writable } from 'svelte/store';
import { subscribe, unsubscribe } from './rl-relay-client';
import { CHANNELS, GAME_EVENTS } from './constants';

const defaultGameSettings = () => ({
	bestOfMatches: 1,
	blueTeamLogo: '',
	blueTeamName: 'Blue team',
	orangeTeamLogo: '',
	orangeTeamName: 'Orange team',
});

const defaultGameState = () => ({
	game: {
		teams: [{ score: 0 }, { score: 0 }],
	},
	hasGame: false,
	players: {},
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
