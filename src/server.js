import bodyParser from 'body-parser';
import { error, info } from 'cli-msg';
import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { connect } from './rl-relay-server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
		bodyParser.json(),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
	)
	.listen(PORT, (err) => {
		if (err) {
			error.wb('Error starting server.', err);
			process.exit(1);
		}

		info.wb(`Open localhost:${PORT} in your browser to display your overlay.`);
		info.wb('Attempting to establish connection to Rocket League.');

		connect(); // Turn into promise and start overlay after.
	});
