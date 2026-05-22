import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

async function seed() {
  await connectDatabase();

  await Activity.deleteMany({});
  await Team.deleteMany({});
  await User.deleteMany({});
  await Workout.deleteMany({});

  const alice = await User.create({
    username: 'alice',
    email: 'alice@example.com',
    password: 'password123',
    goals: ['Run 5K', 'Improve strength'],
  });

  const bob = await User.create({
    username: 'bob',
    email: 'bob@example.com',
    password: 'password123',
    goals: ['Cycling', 'Flexibility'],
  });

  const team = await Team.create({
    name: 'OctoRunners',
    members: [alice._id, bob._id],
    description: 'A team for weekend fitness challenges.',
  });

  await Activity.create({
    user: alice._id,
    type: 'Run',
    duration: 45,
    date: new Date('2026-05-01T08:00:00.000Z'),
  });

  await Activity.create({
    user: bob._id,
    type: 'Cycling',
    duration: 60,
    date: new Date('2026-05-02T08:00:00.000Z'),
  });

  await Workout.create({
    title: 'Morning Mobility',
    description: 'A short mobility warm-up for the day.',
    difficulty: 'Beginner',
    duration: 15,
    category: 'Mobility',
  });

  await Workout.create({
    title: 'Interval Run',
    description: 'High-intensity interval training for endurance.',
    difficulty: 'Advanced',
    duration: 40,
    category: 'Cardio',
  });

  console.log(`Seeded data for team ${team.name}`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('Failed to seed OctoFit Tracker data:', error);
  process.exit(1);
});
