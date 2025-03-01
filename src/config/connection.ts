import mongoose from 'mongoose';

// Wrap Mongoose around local connection to MongoDB
mongoose.connect('mongodb+srv://000justinalexander:3gQ0lfFL0o7clKhE@cluster2.u7bu8.mongodb.net/social_media2');

// Export connection
export default mongoose.connection;
