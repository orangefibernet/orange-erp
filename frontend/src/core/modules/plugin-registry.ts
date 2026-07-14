import type { ModulePlugin } from "./types";

const plugins: ModulePlugin[] = [];

export function registerPlugin(plugin: ModulePlugin): void {
  plugins.push(plugin);
}

export function getPlugins(): ModulePlugin[] {
  return plugins;
}

export function getPlugin(id: string): ModulePlugin | undefined {
  return plugins.find((p) => p.manifest.id === id);
}