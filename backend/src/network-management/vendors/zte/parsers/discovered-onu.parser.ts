import { ZteUnconfiguredOnu } from '../models/unconfigured-onu.model';

export class DiscoveredOnuParser {
  static parse(
    output: string,
  ): ZteUnconfiguredOnu[] {
    const result: ZteUnconfiguredOnu[] = [];

    const lines = output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    for (const line of lines) {
      if (
        line.startsWith('OnuIndex') ||
        line.startsWith('---') ||
        line.startsWith('ZXAN')
      ) {
        continue;
      }

      const match = line.match(
        /^(gpon-onu_\S+)\s+(\S+)\s+(\S+)$/,
      );

      if (!match) {
        continue;
      }

      result.push({
        interfaceName: match[1],
        onuIndex: match[1].replace(
          'gpon-onu_',
          '',
        ),
        serialNumber: match[2],
        state: match[3],
        discoveredAt: new Date(),
      });
    }

    return result;
  }
}