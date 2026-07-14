import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/billing";

const billingPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "billing",
      label: "Billing",
      path: "/billing",
      icon: "billing",
      order: 3,
    },
  ],
};

export default billingPlugin;
