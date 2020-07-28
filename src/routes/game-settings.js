import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(__dirname, '..', '..', '..', 'src', 'game-settings.json');

export async function get(req, res, next) {
	const data = fs.readFileSync(FILE_PATH);
	const json = JSON.parse(data);
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(json));
}

export async function post(req, res, next) {
	const data = req.body;
	const json = JSON.stringify(data);
	fs.writeFileSync(FILE_PATH, json);
	res.end();
}
