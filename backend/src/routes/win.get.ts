import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	const winner = game.checkWinner();
	if (winner) {
		const winningPlayer =
			game.players[0] === winner ? game.players[0] : game.players[1];
		res.json({ winner: winningPlayer });
	} else {
		res.json({ winner: null });
	}
};
