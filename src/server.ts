import express, { Router } from 'express';
import db from './config/connection.js'; // Ensure this is connecting to your MongoDB
import mongoose from 'mongoose';
import { User } from "./models/index.js";

const router = Router();
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the router for API routes
app.use('/api', router);



// GET all users
router.get('/', async (_req, res): Promise<any> => {
  try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});


// GET single user by _id and populate thoughts & friends
router.get('/:id', async (req, res): Promise<any> => {  // Explicit return type
  try {
      const user = await User.findById(req.params.id)
          .populate('thoughts')   // Populate thoughts
          .populate('friends');   // Populate friends
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);  // Explicit return
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});


// POST new user
router.post('/users', async (req, res): Promise<any> => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// PUT update user by _id
router.put('/:id', async (req, res): Promise<any> => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// DELETE remove user by _id
router.delete('/:id', async (req, res): Promise<any> => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});


// POST to add a new friend to a user's friend list

router.post('/:userId/friends/:friendId', async (req, res): Promise<any> => {
    try {
        const { userId, friendId } = req.params;

        // Check if the user and friend exist
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: "User or Friend not found" });
        }

        // Prevent adding the user to their own friend list
        if (userId === friendId) {
            return res.status(400).json({ message: "You cannot add yourself as a friend" });
        }

        // Ensure the friend ID is correctly formatted
        const friendObjectId = new mongoose.Types.ObjectId(friendId);

        // Check if friend is already in the list
        if (user.friends.some((friend) => friend.toString() === friendId)) {
            return res.status(400).json({ message: "Friend already added" });
        }

        user.friends.push(friendObjectId);
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res): Promise<any> => {
    try {
        const { userId, friendId } = req.params;

        const friendObjectId = new mongoose.Types.ObjectId(friendId);


        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove friend from user's friend list if present
        if (!user.friends.includes(friendObjectId)) {
            return res.status(400).json({ message: "Friend not found in user's friend list" });
        }

        user.friends = user.friends.filter((friend) => friend.toString() !== friendId);
        await user.save();

        res.status(200).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});

// module.exports = router;


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


export default router;