import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String, default: '' },
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
//# sourceMappingURL=team.js.map