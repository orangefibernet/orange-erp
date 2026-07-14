import type { ModulePlugin } from "../../core/modules";

import manifest from "../../core/modules/manifests/subscribers";

const subscribersPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "subscribers",
      label: "Subscribers",
      path: "/subscribers",
      icon: "subscribers",
      order: 2,
    },
  ],
};

export default subscribersPlugin;
