import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'displayName username')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();
  response.json({ resource: 'leaderboard', data: leaderboard });
});