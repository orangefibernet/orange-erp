import { readFileSync } from 'fs';

import { OnuStateParser } from '../vendors/zte/parsers/onu-state.parser';

const output = readFileSync(
  './onu-state.txt',
  'utf8',
);

const onus = OnuStateParser.parse(output);

console.dir(onus, {
  depth: null,
  colors: true,
});

console.log();

console.log(`Total ONU: ${onus.length}`);

console.log(
  `Online: ${
    onus.filter((o) => o.online).length
  }`,
);

console.log(
  `Offline: ${
    onus.filter((o) => !o.online).length
  }`,
);