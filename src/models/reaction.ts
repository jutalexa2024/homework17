import { Schema, Types } from 'mongoose';

// Function to format timestamps
const formatTimestamp = (timestamp: Date): string => {
  return timestamp.toISOString();
};

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTimestamp, // Assign function reference
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;
