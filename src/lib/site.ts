const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://rohit-pakhre-portfolio.vercel.app";

export const siteUrl = new URL(configuredSiteUrl).origin;
