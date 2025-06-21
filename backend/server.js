// server.js

import express from 'express';
import cors from 'cors';
import { reviewCode } from './services/aiService.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the AI Code Review API!');
});

app.post('/review', async (req, res) => {
  const { code } = req.body;
  console.log('Received /review request. code:', code);

  if (!code) {
    console.log('No code provided in request.');
    return res.status(400).json({ error: 'Code is required.' });
  }

  try {
    const feedback = await reviewCode(code);
    res.json({ feedback });
  } catch (error) {
    console.error('Error in /review handler:', error);
    res.status(500).json({ error: 'Code review failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
