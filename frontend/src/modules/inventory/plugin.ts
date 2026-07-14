import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/inventory";

const inventoryPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "inventory",
      label: "Inventory",
      path: "/inventory",
      icon: "inventory",
      order: 4,
    },
  ],
};

export default inventoryPlugin;
