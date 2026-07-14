import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/settings";

const settingsPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: "settings",
      order: 8,
    },
  ],
};

export default settingsPlugin;
