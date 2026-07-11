export interface ZteOpticalPower {
  interfaceName: string;

  onuIndex: string;

  oltRxPower: string;

  oltTxPower: string;

  onuRxPower: string;

  onuTxPower: string;

  upstreamAttenuation: string;

  downstreamAttenuation: string;

  online: boolean;

  collectedAt: Date;
}