import { Router } from 'express';
import { Activity } from '../models/activity.js';
export const activitiesRouter = Router();
activitiesRouter.get('/', async (_request, response) => {
    const activities = await Activity.find()
        .populate('user', 'displayName username')
        .populate('team', 'name')
        .sort({ completedAt: -1 })
        .lean();
    response.json({ resource: 'activities', data: activities });
});
