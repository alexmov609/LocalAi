import ollama from 'ollama';
import { CONFIG } from './config.js';

export interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

/**
 * Stream answer form the model, printing it as it comes and returning the full answer at the end.
 * @param userInput - the user's question or prompt
 * @returns the full answer from the model after streaming is complete  
 */
export async function askStream(userInput: string): Promise<string> {
    const messages: Message[] = [{ role: 'user', content: userInput }];

    const stream = await ollama.chat({
        model: CONFIG.model,
        messages,
        stream: true,
    });

    let full = '';
    for await (const chunk of stream) {
        const piece = chunk.message.content;
        process.stdout.write(piece);
        full += piece;
    }
    process.stdout.write('\n');
    return full;
}