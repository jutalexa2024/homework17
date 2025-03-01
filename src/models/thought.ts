import mongoose, { Schema, Types, Document } from 'mongoose';
import reactionSchema from '../models/reaction.js';

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.DocumentArray<typeof reactionSchema>;
}

const formatTimestamp = (timestamp: Date): string => timestamp.toISOString();

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], 
  },
  {
    toJSON: { getters: true, virtuals: true },
    id: false,
  }
);

// Virtual to format timestamp
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return formatTimestamp(this.createdAt);
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);

export default Thought;
