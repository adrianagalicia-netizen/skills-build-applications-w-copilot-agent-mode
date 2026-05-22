import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    duration: { type: Number, required: true },
    category: { type: String, required: true },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
//# sourceMappingURL=workout.js.map