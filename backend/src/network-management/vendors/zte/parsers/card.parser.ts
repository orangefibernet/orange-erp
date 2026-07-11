import { ZteCard } from '../models/card.model';

export class CardParser {
  static parse(output: string): ZteCard[] {
    const cards: ZteCard[] = [];

    const lines = output.split(/\r?\n/);

    for (const line of lines) {
      const text = line.trim();

      if (!text) continue;

      if (text.startsWith('Rack')) continue;

      if (text.startsWith('---')) continue;

      if (text.startsWith('ZXAN')) continue;

      const parts = text.split(/\s+/);

      if (parts.length < 7) {
        continue;
      }

      const rack = Number(parts[0]);
      const shelf = Number(parts[1]);
      const slot = Number(parts[2]);

      if (
        Number.isNaN(rack) ||
        Number.isNaN(shelf) ||
        Number.isNaN(slot)
      ) {
        continue;
      }

      const configuredType = parts[3];
      const realType = parts[4];
      const portCount = Number(parts[5]);

      let hardwareVersion = '';
      let softwareVersion = '';
      let status = '';

      // Cards without software version (PRWG)
      if (parts.length === 8) {
        hardwareVersion = parts[6];
        status = parts[7];
      } else {
        hardwareVersion = parts[6] ?? '';
        softwareVersion = parts[7] ?? '';
        status = parts.slice(8).join(' ');
      }

      cards.push({
        rack,
        shelf,
        slot,
        configuredType,
        realType,
        portCount,
        hardwareVersion,
        softwareVersion,
        status,
      });
    }

    return cards;
  }
}