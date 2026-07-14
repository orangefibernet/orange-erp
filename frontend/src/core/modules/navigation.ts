import {
  getPlugins,
  type ModuleNavigationItem,
} from ".";

export function getNavigationItems(): ModuleNavigationItem[] {
  return getPlugins()
    .flatMap((plugin) => plugin.navigation ?? [])
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}