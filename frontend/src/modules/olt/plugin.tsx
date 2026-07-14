import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/olt";

const oltPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "olt",
      label: "OLT",
      path: "/olt",
      icon: "olt",
      order: 5,
    },
  ],
};

export default oltPlugin;