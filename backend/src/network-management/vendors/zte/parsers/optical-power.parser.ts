import { ZteOpticalPower } from '../models/optical-power.model';

export class OpticalPowerParser {
  static parse(
    interfaceName: string,
    output: string,
  ): ZteOpticalPower {
    const onuIndex = interfaceName.replace(
      'gpon-onu_',
      '',
    );

    const get = (regex: RegExp): string => {
      const match = output.match(regex);
      return match ? match[1].trim() : 'N/A';
    };

    const online =
      !output.toLowerCase().includes('no signal');

    return {
      interfaceName,

      onuIndex,

      oltRxPower: get(/up\s+Rx\s*:(.*?)\s+Tx:/is),

      onuTxPower: get(/up.*?Tx\s*:(.*?)\s{2,}/is),

      upstreamAttenuation: get(
        /up.*?Tx\s*:.*?\s{2,}(.*?)(?:\r?\n|$)/is,
      ),

      oltTxPower: get(/down\s+Tx\s*:(.*?)\s+Rx:/is),

      onuRxPower: get(/down.*?Rx\s*:(.*?)\s{2,}/is),

      downstreamAttenuation: get(
        /down.*?Rx\s*:.*?\s{2,}(.*?)(?:\r?\n|$)/is,
      ),

      online,

      collectedAt: new Date(),
    };
  }
}