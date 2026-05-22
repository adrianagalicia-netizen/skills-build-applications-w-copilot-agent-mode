import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
export async function connectDatabase() {
    await mongoose.connect(mongoUri);
}
//# sourceMappingURL=database.js.map