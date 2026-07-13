import type { ReactNode } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../core/theme";
import { BrandProvider } from "../core/branding";

interface Props {
  children: ReactNode;
}

export default function Providers({
  children,
}: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrandProvider>
        {children}
      </BrandProvider>
    </ThemeProvider>
  );
}