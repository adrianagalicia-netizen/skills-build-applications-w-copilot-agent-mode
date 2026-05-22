import { Router } from 'express';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';
const router = Router();
router.get('/users', async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
});
router.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
});
router.get('/teams', async (_req, res) => {
    const teams = await Team.find().populate('members').sort({ createdAt: -1 });
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const team = await Team.create(req.body);
    res.status(201).json(team);
});
router.get('/activities', async (_req, res) => {
    const activities = await Activity.find().populate('user').sort({ date: -1 });
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const workout = await Workout.create(req.body);
    res.status(201).json(workout);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await Activity.aggregate([
        { $group: { _id: '$user', totalMinutes: { $sum: '$duration' } } },
        { $sort: { totalMinutes: -1 } },
        { $limit: 10 },
    ]);
    const users = await User.find({ _id: { $in: leaderboard.map((entry) => entry._id) } });
    const mapped = leaderboard.map((entry) => {
        const user = users.find((candidate) => candidate._id.toString() === entry._id.toString());
        return {
            user: user?.username ?? 'Unknown user',
            totalMinutes: entry.totalMinutes,
        };
    });
    res.json(mapped);
});
export default router;
//# sourceMappingURL=index.js.map