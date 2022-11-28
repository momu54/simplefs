// check env
import 'dotenv/config';
if (!(process.env.cert && process.env.key && process.env.passwd))
	throw new Error('Missing environment!');

import express from 'express';
import spdy from 'spdy';
const { createServer } = spdy;
import { readFile, access, constants, readdir, lstat } from 'fs/promises';
import { existsSync } from 'fs';

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(express.text());

server.get('/favicon.ico', (_req, res) => {
	res.sendStatus(404);
});

server.get('/dl/*', async (req, res) => {
	if (req.query.passwd != process.env.passwd) {
		res.sendStatus(401);
		return;
	}
	const filepath = decodeURI(req.path.replace('/dl', ''));
	if (!existsSync(filepath)) {
		res.sendStatus(404);
		return;
	}
	if (!(await checkpath(filepath))) {
		res.sendStatus(403);
		return;
	}
	res.sendFile(filepath);
});

server.get('*', async (req, res) => {
	if (req.query.passwd != process.env.passwd) {
		res.sendStatus(401);
		return;
	}
	const path = decodeURI(req.path);
	const isdir = (await lstat(path)).isDirectory();
	if (!isdir) {
		res.sendStatus(400);
		return;
	}
	const dir = await readdir(req.path);
	const html = await readFile('dir.html');
	const fileshtml = await Promise.all(
		dir.map(async (item) => {
			const filepath = `${path}/${item}`.replace('//', '/');
			try {
				if ((await lstat(filepath)).isDirectory())
					return `<a href="${filepath}?passwd=${req.query.passwd}">${item}/</a>`;
				else
					return `<a href="/dl${filepath}?passwd=${req.query.passwd}">${item}</a>`;
			} catch (error) {
				return `<s>${item}</s>`;
			}
		})
	);
	const reshtml = `${html.toString()}<a href="./..?passwd=${
		req.query.passwd
	}">..</a><br>${fileshtml.join('<br>')}`;
	res.send(reshtml);
});

createServer(
	{
		key: await readFile(process.env.key || ''),
		cert: await readFile(process.env.cert || ''),
	},
	server
).listen(8443, console.log);

/**
 * @param {string} path
 */

async function checkpath(path) {
	try {
		await access(path, constants.R_OK | constants.W_OK);
	} catch (error) {
		return false;
	}
	return true;
}
