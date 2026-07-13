export type ModuleCategory =
  | "Operations"
  | "Customers"
  | "Finance"
  | "Inventory"
  | "Network"
  | "Analytics"
  | "Administration";

export type ModuleLicense =
  | "community"
  | "professional"
  | "enterprise";

export interface ModuleManifest {
  id: string;
  name: string;
  description: string;
  version: string;

  category: ModuleCategory;

  icon: string;

  order: number;

  enabled: boolean;

  license: ModuleLicense;
}