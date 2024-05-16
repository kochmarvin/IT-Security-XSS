import express = require('express');

import * as path from 'path';

import { TicTacToe } from './game/game';
import { initCore } from '@grafe/grafe-core';

import cors = require('cors');

const app = express();


app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);


initCore(path.join(__dirname, '../grafe.json'), app);

// get the port the server should use
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on Port ${port}`);
});

const game = new TicTacToe();
export { game };
