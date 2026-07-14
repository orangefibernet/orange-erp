import dashboard from "./manifests/dashboard";
import subscribers from "./manifests/subscribers";
import billing from "./manifests/billing";
import inventory from "./manifests/inventory";
import olt from "./manifests/olt";
import onu from "./manifests/onu";
import reports from "./manifests/reports";
import settings from "./manifests/settings";

import type { ModuleManifest } from "./types";

export const moduleRegistry: ModuleManifest[] = [
  dashboard,
  subscribers,
  billing,
  inventory,
  olt,
  onu,
  reports,
  settings,
];

export function getModules(): ModuleManifest[] {
  return moduleRegistry
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);
}

export function getModule(id: string): ModuleManifest | undefined {
  return moduleRegistry.find((m) => m.id === id);
}