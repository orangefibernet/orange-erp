import { ZteCard } from '../models/card.model';

export class CardParser {

  static parse(
    output: string,
  ): ZteCard[] {

    const cards: ZteCard[] = [];

    const lines =
      output.split('\n');

    for (const line of lines) {

      const value =
        line.trim();

      if (
        value === '' ||
        value.startsWith('Rack') ||
        value.startsWith('---')
      ) {
        continue;
      }

      const p =
        value.split(/\s+/);

      if (p.length < 9) {
        continue;
      }

      cards.push({

        rack: Number(p[0]),

        shelf: Number(p[1]),

        slot: Number(p[2]),

        configuredType: p[3],

        realType: p[4],

        ports: Number(p[5]),

        hardwareVersion: p[6],

        softwareVersion: p[7],

        status: p[8],

      });

    }

    return cards;

  }

}
