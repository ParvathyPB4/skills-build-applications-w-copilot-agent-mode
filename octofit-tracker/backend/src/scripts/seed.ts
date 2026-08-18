import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya-chen', email: 'maya.chen@example.com', displayName: 'Maya Chen', goal: 'Build consistent strength' },
      { username: 'jordan-rivera', email: 'jordan.rivera@example.com', displayName: 'Jordan Rivera', goal: 'Improve endurance' },
      { username: 'sam-taylor', email: 'sam.taylor@example.com', displayName: 'Sam Taylor', goal: 'Train for a 10K' },
    ]);

    const teams = await Team.create([
      { name: 'Morning Momentum', description: 'Early risers building healthy habits', members: [users[0]._id, users[1]._id] },
      { name: 'Weekend Warriors', description: 'Make every weekend workout count', members: [users[2]._id] },
    ]);

    await Activity.create([
      { user: users[0]._id, team: teams[0]._id, type: 'Strength training', durationMinutes: 45, calories: 320, completedAt: new Date('2026-08-16T07:30:00Z') },
      { user: users[1]._id, team: teams[0]._id, type: 'Cycling', durationMinutes: 60, calories: 510, completedAt: new Date('2026-08-15T06:45:00Z') },
      { user: users[2]._id, team: teams[1]._id, type: 'Running', durationMinutes: 38, calories: 430, completedAt: new Date('2026-08-17T09:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 860, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 735, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 610, rank: 3 },
    ]);

    await Workout.create([
      { name: 'Core and Balance', type: 'Strength', difficulty: 'beginner', durationMinutes: 25, targetCalories: 180 },
      { name: 'Tempo Run Builder', type: 'Cardio', difficulty: 'intermediate', durationMinutes: 35, targetCalories: 360 },
      { name: 'Full Body Power', type: 'Strength', difficulty: 'advanced', durationMinutes: 50, targetCalories: 480 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
