// backend/routes/aiRoute.js

import express from 'express';
import { reviewCode } from '../services/aiService.js';  // Import the reviewCode function

const router = express.Router();

// POST route to review code
router.post('/review', async (req, res) => {
  const { code } = req.body;  // Get code from the request body

  try {
    const feedback = await reviewCode(code);  // Get feedback from SambaNova API
    res.json({ feedback });  // Send feedback to the client
  } catch (error) {
    console.error('Error during code review:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
