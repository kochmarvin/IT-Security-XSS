import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	const playerName = req.body.name;
	const message = game.join(playerName);
	res.send(message);
};
