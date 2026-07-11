import { ZteOnuDetail } from '../models/onu-detail.model';

export class OnuDetailParser {
  static parse(output: string): ZteOnuDetail[] {
    const result: ZteOnuDetail[] = [];

    const blocks = output.split(/Onu interface:/i);

    for (const block of blocks) {
      if (!block.trim()) {
        continue;
      }

      const detail: Partial<ZteOnuDetail> = {};

      const interfaceMatch = block.match(
        /gpon-onu_(\d+)\/(\d+)\/(\d+):(\d+)/i,
      );

      if (!interfaceMatch) {
        continue;
      }

      detail.rack = Number(interfaceMatch[1]);
      detail.shelf = Number(interfaceMatch[2]);
      detail.pon = Number(interfaceMatch[3]);
      detail.onuId = Number(interfaceMatch[4]);

      detail.onuIndex =
        `${detail.rack}/${detail.shelf}/${detail.pon}:${detail.onuId}`;

      detail.interfaceName =
        `gpon-onu_${detail.onuIndex}`;

      detail.serialNumber =
        this.find(block, /Serial number\s*:\s*(.+)/i);

      detail.password =
        this.find(block, /Password\s*:\s*(.+)/i);

      detail.vendor =
        this.find(block, /Vendor ID\s*:\s*(.+)/i);

      detail.model =
        this.find(block, /ONU type\s*:\s*(.+)/i);

      detail.firmwareVersion =
        this.find(block, /Software version\s*:\s*(.+)/i);

      detail.hardwareVersion =
        this.find(block, /Hardware version\s*:\s*(.+)/i);

      detail.authenticationType =
        this.find(block, /Auth type\s*:\s*(.+)/i);

      detail.registrationTime =
        this.find(block, /Register time\s*:\s*(.+)/i);

      detail.description =
        this.find(block, /Description\s*:\s*(.+)/i);

      detail.distance =
        this.find(block, /Distance\s*:\s*(.+)/i);

      detail.status =
        this.find(block, /Run state\s*:\s*(.+)/i);

      detail.discoveredAt = new Date();

      result.push(detail as ZteOnuDetail);
    }

    return result;
  }

  private static find(
    text: string,
    regex: RegExp,
  ): string {
    const match = text.match(regex);

    return match ? match[1].trim() : '';
  }
}