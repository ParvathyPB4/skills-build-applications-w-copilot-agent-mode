import { Router } from 'express';
import { Workout } from '../models/workout.js';
export const workoutsRouter = Router();
workoutsRouter.get('/', async (_request, response) => {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 }).lean();
    response.json({ resource: 'workouts', data: workouts });
});
