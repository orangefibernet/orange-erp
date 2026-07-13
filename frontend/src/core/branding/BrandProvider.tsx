import { createContext } from "react";
import type { ReactNode } from "react";

import type { Brand } from "./brand";
import { defaultBrand } from "./brand";

export const BrandContext = createContext<Brand>(defaultBrand);

interface Props {
  children: ReactNode;
}

export default function BrandProvider({
  children,
}: Props) {
  return (
    <BrandContext.Provider value={defaultBrand}>
      {children}
    </BrandContext.Provider>
  );
}