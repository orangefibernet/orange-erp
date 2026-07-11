import { ZteOnuState } from '../models/onu-state.model';

export class OnuStateParser {
  static parse(output: string): ZteOnuState[] {
    const result: ZteOnuState[] = [];

    const lines = output.split(/\r?\n/);

    for (const line of lines) {
      const text = line.trim();

      if (!text) continue;

      if (text.startsWith('OnuIndex')) continue;

      if (text.startsWith('----')) continue;

      if (text.startsWith('ONU Number')) continue;

      if (text.startsWith('ZXAN')) continue;

      const parts = text.split(/\s+/);

      if (parts.length < 5) continue;

      const onuIndex = parts[0];

      /**
       * Example:
       * 1/3/1:43
       *
       * rack = 1
       * slot = 3
       * pon  = 1
       * onu  = 43
       */
      const match =
        onuIndex.match(
          /^(\d+)\/(\d+)\/(\d+):(\d+)$/
        );

      if (!match) {
        continue;
      }

      const rack = Number(match[1]);

      /**
       * ZTE C300
       *
       * Shelf is always 1.
       */
      const shelf = 1;

      const slot = Number(match[2]);

      const pon = Number(match[3]);

      const onuId = Number(match[4]);

      const adminState = parts[1];

      const omccState = parts[2];

      const phaseState = parts[3];

      const channel =
        parts.slice(4).join(' ');

      result.push({
        rack,
        shelf,
        slot,
        pon,
        onuId,

        onuIndex,

        interfaceName:
          `gpon-onu_${rack}/${slot}/${pon}:${onuId}`,

        adminState,

        omccState,

        phaseState,

        channel,

        online:
          phaseState.toLowerCase() ===
          'working',

        discoveredAt:
          new Date(),
      });
    }

    return result;
  }
}