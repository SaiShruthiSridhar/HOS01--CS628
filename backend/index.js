const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'https://improved-parakeet-v6pj959vqr7g2wwj9-3000.app.github.dev',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Backend is working');
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.content;
  console.log('📩 Prompt from frontend:', userMessage);

  if (!userMessage || typeof userMessage !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt' });
  }

  try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
      model: 'gemma:2b',
      prompt: userMessage,
      stream: false,
    });

    const reply = response.data?.response || '⚠️ No model output.';
    res.json({ response: reply });
  } catch (error) {
    console.error('❌ Ollama error:', error.message);
    res.status(500).json({ error: 'Model call failed.' });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Backend listening on http://0.0.0.0:${port}`);
});
