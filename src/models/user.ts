import { Schema, model, Document, Types } from 'mongoose';


interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Types.ObjectId[];
  friends: Types.ObjectId[];
}


const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model<IUser>('User', userSchema);

export default User;

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value
// User.find({})
//   .exec()
//   .then(async collection => {
//     if (collection.length === 0) {
//       const results = await User.insertMany(
//         [
//           { name: 'Produce' },
//           { name: 'Dairy' },
//           { name: 'Meat' },
//           { name: 'Wine' },
//           { name: 'Wine' },
//           { name: 'Wine' },
//           { name: 'Flowers' },
//         ]
//       );
//       return console.log('Departments inserted', results);
//     }
//     return console.log('Already populated');
//   })
//   .catch(err => console.log(err));


