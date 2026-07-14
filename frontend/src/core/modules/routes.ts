import { getPlugins } from "./plugin-registry";
import type { ModuleRoute } from "./types";

export function getModuleRoutes(): ModuleRoute[] {
  return getPlugins()
    .flatMap((plugin) => plugin.routes ?? []);
}