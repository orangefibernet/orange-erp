export interface ZteOnuState {
  /**
   * Physical Location
   *
   * Example:
   * 1/3/1:43
   *
   * Rack = 1
   * Slot = 3
   * PON  = 1
   * ONU  = 43
   *
   * Shelf is fixed as 1 on ZTE C300.
   */

  rack: number;

  shelf: number;

  slot: number;

  pon: number;

  onuId: number;

  /**
   * Original CLI Index
   *
   * Example:
   * 1/3/1:43
   */
  onuIndex: string;

  /**
   * Example:
   * gpon-onu_1/3/1:43
   */
  interfaceName: string;

  adminState: string;

  omccState: string;

  phaseState: string;

  channel: string;

  /**
   * Convenience flag
   */
  online: boolean;

  discoveredAt: Date;
}