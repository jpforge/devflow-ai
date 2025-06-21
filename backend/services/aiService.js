import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new OpenAI({
  baseURL: 'https://api.sambanova.ai/v1',
  apiKey: process.env.SAMBANOVA_API_KEY,
});

export async function reviewCode(code) {
  try {
    const response = await client.chat.completions.create({
      model: 'DeepSeek-R1-0528',
      messages: [
        { role: 'system', content: 'You are an expert code reviewer. Please review the following code and suggest improvements.' },
        { role: 'user', content: code },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error during AI code review:', error);
    throw error;
  }
}
