// controllers/AppController.js
import { redisClient } from '../utils/redis';
import { dbClient } from '../utils/db';

const AppController = {
  getStatus: (req, res) => {
    // Check if Redis and DB are alive
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).json(status);
  },

  getStats: async (req, res) => {
    try {
      // Get the number of users and files from the database
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();

      const stats = {
        users: usersCount,
        files: filesCount,
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = AppController;
