import { Request, Response } from 'express';

import { game } from '..';

export = async (req: Request, res: Response) => {
	return res.send(game.players);
};
