export interface ZteUnconfiguredOnu {
  /**
   * Example:
   * gpon-onu_1/5/9:1
   */
  interfaceName: string;

  /**
   * Example:
   * 1/5/9:1
   */
  onuIndex: string;

  /**
   * Example:
   * ZTEGD1A97068
   */
  serialNumber: string;

  /**
   * Example:
   * unknown
   */
  state: string;

  /**
   * Time when the ONU was discovered.
   */
  discoveredAt: Date;
}