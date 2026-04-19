import { Ollama } from 'ollama'
import { CONFIG } from './config.js'
const MODEL = CONFIG.model;

const ollama = new Ollama({
    host: process.env.OLLAMA_HOST
});

const res = await ollama.chat({
    model: MODEL,
    messages: [
        { role: 'user', content: 'Привет! Ответь одним предложением: ты кто?' },
    ],
});

console.log(`[${MODEL}]`, res.message.content);