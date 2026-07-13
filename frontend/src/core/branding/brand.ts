export interface Brand {
  companyName: string;
  productName: string;
  logo: string;
  favicon: string;

  primaryColor: string;
  secondaryColor: string;

  supportEmail: string;
  supportPhone: string;
  website: string;
}

export const defaultBrand: Brand = {
  companyName: "Orange Fibernet",
  productName: "OrangeERP",

  logo: "/logo.svg",
  favicon: "/favicon.svg",

  primaryColor: "#F57C00",
  secondaryColor: "#2563EB",

  supportEmail: "support@orangefibernet.in",
  supportPhone: "+91 9849664373",
  website: "https://orangefibernet.in",
};