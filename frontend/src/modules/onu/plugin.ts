import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/onu";

const onuPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "onu",
      label: "ONU",
      path: "/onu",
      icon: "onu",
      order: 6,
    },
  ],
};

export default onuPlugin;
