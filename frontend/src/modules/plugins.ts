import { registerPlugin } from "../core/modules";

import dashboardPlugin from "./dashboard/plugin";
import subscribersPlugin from "./subscribers/plugin";
import billingPlugin from "./billing/plugin";
import inventoryPlugin from "./inventory/plugin";
import oltPlugin from "./olt/plugin";
import onuPlugin from "./onu/plugin";
import reportsPlugin from "./reports/plugin";
import settingsPlugin from "./settings/plugin";

registerPlugin(dashboardPlugin);
registerPlugin(subscribersPlugin);
registerPlugin(billingPlugin);
registerPlugin(inventoryPlugin);
registerPlugin(oltPlugin);
registerPlugin(onuPlugin);
registerPlugin(reportsPlugin);
registerPlugin(settingsPlugin);