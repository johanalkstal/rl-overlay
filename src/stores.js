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
export const gameSettings = gameSettingsStore(defaultGameSettings());

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

function gameSettingsStore(initialValue) {
	const store = writable(initialValue);
	const { subscribe: storeSubscribe, set } = store;
	const hasWindow = typeof window !== 'undefined';

	if (hasWindow) {
		window
			.fetch('/game-settings')
			.then((response) => response.json())
			.then((data) => {
				set(data);
			});
	}

	return {
		set(value) {
			if (hasWindow) {
				window
					.fetch('/game-settings', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(value),
					})
					.then(() => set(value));
			}
		},
		update(updateFunc) {
			const value = updateFunc(get(store));
			this.set(value);
		},
		subscribe: storeSubscribe,
	};
}
