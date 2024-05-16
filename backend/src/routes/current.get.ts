import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	res.json({ current: game.players[game.currentPlayer] });
};
