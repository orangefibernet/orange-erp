import { ZteOnuState } from './onu-state.model';
import { ZteOnuDetail } from './onu-detail.model';
import { ZteOpticalPower } from './optical-power.model';

export interface ZteDiscoveredOnu {
  state: ZteOnuState;

  detail?: ZteOnuDetail;

  optical?: ZteOpticalPower;
}