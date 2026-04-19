import { CONFIG } from './config.js'
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { askStream } from './chat.js';

const rl = readline.createInterface({ input, output });
console.log(`\n🤖 Assistent is running (model: ${CONFIG.model})`);
console.log(`Write something. commands: /exit\n`);


while (true) {
    const userInput = (await rl.question('Ты: ')).trim();

    if (!userInput) continue;
    if (userInput === '/exit') break;

    process.stdout.write('AI: ');
    try {
        await askStream(userInput);
    } catch (err) {
        console.error('\n[ошибка]', err instanceof Error ? err.message : err);
    }
    console.log(); // пустая строка между ходами
}

rl.close();
console.log('Пока! 👋');