/**
 * Subscribable channels.
 */
export const CHANNELS = {
	GAME: 'game',
	RELAY_SERVER: 'relay_server',
};

/**
 * Subscribable events from the GAME channel.
 */
export const GAME_EVENTS = {
	GOAL_SCORED: 'goal_scored',
	INITIALIZED: 'initialized',
	MATCH_CREATED: 'match_created',
	MATCH_ENDED: 'match_ended',
	PODIUM_START: 'podium_start',
	POST_COUNTDOWN_BEGIN: 'post_countdown_begin',
	PRE_COUNTDOWN_BEGIN: 'pre_countdown_begin',
	REPLAY_END: 'replay_end',
	REPLAY_START: 'replay_start',
	REPLAY_WILL_END: 'replay_will_end',
	STATFEED_EVENT: 'statfeed_event',
	UPDATE_STATE: 'update_state',
};

/**
 * The key used to store game settings in local storage.
 */
export const LOCAL_STORAGE_KEY = 'RLOverlay';

/**
 * Subscribable events from the RELAY_SERVER channel.
 */
export const RELAY_SERVER_EVENTS = {
	SUBSCRIBE: 'subscribe',
	UNSUBSCRIBE: 'unsubscribe',
};

/**
 * The port for the local web socket server.
 */
export const RELAY_SERVER_PORT = 49322;
