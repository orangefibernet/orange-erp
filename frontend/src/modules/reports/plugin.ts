import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/reports";

const reportsPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "reports",
      label: "Reports",
      path: "/reports",
      icon: "reports",
      order: 7,
    },
  ],
};

export default reportsPlugin;
