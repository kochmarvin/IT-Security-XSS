import { Request, Response } from 'express';

import { game } from '../index';

export = async (req: Request, res: Response) => {
	const logs = game.getLogs();
	res.json({ logs: logs });
};
