export class ZteCommands {
  /**
   * ================================
   * SHOW COMMANDS
   * ================================
   */

  static readonly SHOW_CARD =
    'show card';

  static readonly SHOW_ONU_STATE =
    'show gpon onu state';

  static readonly SHOW_ONU_DETAIL =
    'show gpon onu detail';

  static readonly SHOW_OPTICAL_POWER =
    'show pon power attenuation';

  static readonly SHOW_UNCONFIGURED_ONUS =
    'show gpon onu uncfg';

  /**
   * ================================
   * QUERY COMMANDS
   * ================================
   */

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

  /**
   * ================================
   * ONU PROVISIONING
   * ================================
   */

  static buildProvisionOnuCommands(
    ponPort: string,
    onuId: number,
    onuType: string,
    serialNumber: string,
  ): string[] {
    return [
      `configure terminal`,
      `interface gpon-olt_${ponPort}`,
      `onu ${onuId} type ${onuType} sn ${serialNumber}`,
      `exit`,
      `exit`,
    ];
  }

  /**
   * ================================
   * ONU DELETE
   * ================================
   */

  static buildDeprovisionOnuCommands(
    ponPort: string,
    onuId: number,
  ): string[] {
    return [
      `configure terminal`,
      `interface gpon-olt_${ponPort}`,
      `no onu ${onuId}`,
      `exit`,
      `exit`,
    ];
  }

  /**
   * ================================
   * ONU REBOOT
   * ================================
   */

  static buildRebootOnuCommand(
    interfaceName: string,
  ): string {
    return `reboot ${interfaceName}`;
  }

  /**
   * ================================
   * ONU FACTORY RESET
   * ================================
   */

  static buildFactoryResetCommand(
    interfaceName: string,
  ): string {
    return `restore factory ${interfaceName}`;
  }

  /**
   * ================================
   * ONU ENABLE
   * ================================
   */

  static buildEnableOnuCommand(
    interfaceName: string,
  ): string {
    return `interface ${interfaceName}
no shutdown
exit`;
  }

  /**
   * ================================
   * ONU DISABLE
   * ================================
   */

  static buildDisableOnuCommand(
    interfaceName: string,
  ): string {
    return `interface ${interfaceName}
shutdown
exit`;
  }

  /**
   * ================================
   * ONU NAME
   * ================================
   */

  static buildOnuNameCommand(
    interfaceName: string,
    name: string,
  ): string[] {
    return [
      `interface ${interfaceName}`,
      `name ${name}`,
      `exit`,
    ];
  }

  /**
   * ================================
   * ONU DESCRIPTION
   * ================================
   */

  static buildOnuDescriptionCommand(
    interfaceName: string,
    description: string,
  ): string[] {
    return [
      `interface ${interfaceName}`,
      `description ${description}`,
      `exit`,
    ];
  }
  
}