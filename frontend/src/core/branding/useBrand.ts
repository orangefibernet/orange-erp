import { useContext } from "react";

import { BrandContext } from "./BrandProvider";

export function useBrand() {
  return useContext(BrandContext);
}