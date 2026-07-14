import type { ModulePlugin } from "../../core/modules";
import manifest from "../../core/modules/manifests/dashboard";

const dashboardPlugin: ModulePlugin = {
  manifest,

  navigation: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/",
      icon: "dashboard",
      order: 1,
    },
  ],
};

export default dashboardPlugin;