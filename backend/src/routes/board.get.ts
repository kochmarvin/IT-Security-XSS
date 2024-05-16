import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	const board = game.getBoard();
	res.json(board);
};
