import { Router } from 'express';
import { Team } from '../models/team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'displayName username').sort({ name: 1 }).lean();
  response.json({ resource: 'teams', data: teams });
});