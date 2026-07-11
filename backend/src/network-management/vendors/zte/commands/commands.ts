export class ZteCommands {
  static readonly SHOW_CARD =
    'show card';

  static readonly SHOW_ONU_STATE =
    'show gpon onu state';

  static readonly SHOW_ONU_DETAIL =
    'show gpon onu detail';

  static readonly SHOW_OPTICAL_POWER =
    'show pon power attenuation';

  static buildOnuDetailCommand(
    interfaceName: string,
  ): string {
    return `${this.SHOW_ONU_DETAIL} ${interfaceName}`;
  }

  static buildOpticalPowerCommand(
    interfaceName: string,
  ): string {
    return `${this.SHOW_OPTICAL_POWER} ${interfaceName}`;
  }
}