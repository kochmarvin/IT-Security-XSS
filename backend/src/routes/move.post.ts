import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	const { player, index } = req.body;
	const message = game.makeMove(player, index);
	res.send(message);
};
