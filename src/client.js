import { start } from '@sapper/app';
import { connect } from './rl-relay-client';

start({
	target: document.querySelector('#sapper'),
});

connect();
