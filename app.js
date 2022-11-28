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
	const path = req.path;
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
					return `<a href="${filepath}">${item}/</a>`;
				else return `<a href="/dl${filepath}">${item}</a>`;
			} catch (error) {
				return `<s>${item}</s>`;
			}
		})
	);
	const reshtml = `${html.toString()}${fileshtml.join('<br>')}`;
	res.send(reshtml);
});

createServer(
	{
		key: await readFile('momu54.cf.key'),
		cert: await readFile('momu54.cf.pem'),
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
