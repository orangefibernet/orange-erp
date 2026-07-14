import type { ReactNode } from "react";

export interface ModuleManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  category: string;
  icon: string;
  order: number;
  enabled: boolean;
  license: string;
}

export interface ModuleNavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  order?: number;
}

export interface ModuleRoute {
  path: string;
  element: ReactNode;
}

export interface ModulePlugin {
  manifest: ModuleManifest;

  navigation?: ModuleNavigationItem[];

  routes?: ModuleRoute[];

  permissions?: string[];

  widgets?: ReactNode[];
}