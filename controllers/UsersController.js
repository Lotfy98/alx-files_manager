// controllers/UsersController.js
const { dbClient } = require('../utils/db'); // Import your MongoDB client

const UsersController = {
  postNew: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      // Check if email already exists in the database
      const existingUser = await dbClient.usersCollection().findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password (you can use a library like bcrypt for stronger hashing)
      const hashedPassword = require('crypto').createHash('sha1').update(password).digest('hex');

      // Create a new user
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Save the user to the 'users' collection
      const result = await dbClient.usersCollection().insertOne(newUser);

      // Return the new user's ID and email
      res.status(201).json({ id: result.insertedId, email });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = UsersController;
