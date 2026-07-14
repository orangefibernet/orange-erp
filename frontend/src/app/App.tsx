import "../modules/plugins";

import { getPlugins } from "../core/modules";
import AppRoutes from "../core/routing/AppRoutes";

console.log("Registered Plugins:", getPlugins());

export default function App() {
  return <AppRoutes />;
}