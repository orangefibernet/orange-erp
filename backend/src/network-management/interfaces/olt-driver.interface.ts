import { DeviceConnection } from './device-connection.interface';
import { CommandResult } from '../models/command-result.model';
import { ZteCard } from '../vendors/zte/models/card.model';
import { ZteOnuState } from '../vendors/zte/models/onu-state.model';
import { ZteOnuDetail } from '../vendors/zte/models/onu-detail.model';
import { ZteOpticalPower } from '../vendors/zte/models/optical-power.model';
import { ZteUnconfiguredOnu } from '../vendors/zte/models/unconfigured-onu.model';
import { ProvisionOnuDto } from '../dto/provision-onu.dto';


export interface OltDriver {
  /**
   * Test device connectivity.
   */
  testConnection(
    connection: DeviceConnection,
  ): Promise<boolean>;

  provisionOnu(
  connection: DeviceConnection,
  dto: ProvisionOnuDto,
): Promise<CommandResult[]>;
  /**
   * Card Discovery
   */
  getCards(
    connection: DeviceConnection,
  ): Promise<ZteCard[]>;

  /**
   * ONU State Discovery
   */
  getOnuStates(
    connection: DeviceConnection,
  ): Promise<ZteOnuState[]>;

  /**
   * ONU Detail
   */
  getOnuDetail(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOnuDetail[]>;

  /**
   * Optical Information
   */
  getOpticalPower(
    connection: DeviceConnection,
    interfaceName: string,
  ): Promise<ZteOpticalPower>;

  /**
   * Unconfigured ONU Discovery
   */
  getUnconfiguredOnus(
    connection: DeviceConnection,
  ): Promise<ZteUnconfiguredOnu[]>;

  executeCommand(
  connection: DeviceConnection,
  command: string,
): Promise<CommandResult>;
}