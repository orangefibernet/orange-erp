import { Socket } from 'net';
import { CardParser } from '../vendors/zte/parsers/card.parser';

const HOST = '103.162.188.2';
const PORT = 2334;

// <<< CHANGE THESE >>>
const USERNAME = 'zte';
const PASSWORD = 'zte';
// <<< CHANGE THESE >>>

const socket = new Socket();

let buffer = '';
let stage = 0;

socket.setEncoding('utf8');

socket.connect(PORT, HOST, () => {
  console.log(`✅ Connected to ${HOST}:${PORT}`);
});

socket.on('data', (data: string) => {
  process.stdout.write(data);

  buffer += data;

  switch (stage) {
    // Wait for Username prompt
    case 0:
      if (buffer.includes('Username:')) {
        socket.write(USERNAME + '\r\n');
        buffer = '';
        stage = 1;
      }
      break;

    // Wait for Password prompt
    case 1:
      if (buffer.includes('Password:')) {
        socket.write(PASSWORD + '\r\n');
        buffer = '';
        stage = 2;
      }
      break;

    // Wait until login completes
    case 2:
      if (buffer.includes('ZXAN#')) {
        console.log('\n✅ LOGIN SUCCESS\n');

        buffer = '';
        stage = 3;

        // Give the OLT a moment before sending the command
        setTimeout(() => {
          socket.write('show card\r\n');
        }, 300);
      }

      if (buffer.includes('%Error')) {
        console.log('\n❌ Login failed.');
        socket.end();
      }

      break;

    // Wait for command output
    case 3:
      if (buffer.includes('ZXAN#')) {
        const output = buffer.replace(/ZXAN#\s*$/m, '');

        console.log('\n================ RAW OUTPUT ================\n');
        console.log(output);

        console.log('\n================ PARSED ====================\n');

        const cards = CardParser.parse(output);

        console.dir(cards, {
          depth: null,
          colors: true,
        });

        socket.end();
      }

      break;
  }
});

socket.on('close', () => {
  console.log('\nDisconnected.');
});

socket.on('error', (err) => {
  console.error(err);
});