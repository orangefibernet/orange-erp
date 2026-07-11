export class CardDto {
  rack: number;

  shelf: number;

  slot: number;

  configuredType: string;

  realType: string;

  portCount: number;

  hardwareVersion?: string;

  softwareVersion?: string;

  status: string;
}