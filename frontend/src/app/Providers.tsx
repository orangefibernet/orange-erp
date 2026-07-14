import type { ReactNode } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import theme from "../core/theme";
import { BrandProvider } from "../core/branding";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export default function Providers({
  children,
}: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrandProvider>
          {children}
        </BrandProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}