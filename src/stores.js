import { readable } from 'svelte/store';
import { subscribe, unsubscribe } from './rl-relay-client';
import { CHANNELS, GAME_EVENTS } from './constants';

export const gameState = readable(null, function start(set) {
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
