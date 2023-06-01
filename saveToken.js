import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Please enter your token: ', (token) => {
  rl.close();

  const envData = `TOKEN = ${token}`;

  fs.writeFile('.env', envData, (err) => {
    if (err) {
      console.error('Error writing to .env file:', err);
    } else {
      console.log('.env file has been created with the token successfully.');
    }
  });
});
