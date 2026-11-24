import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // This app and its dependencies are separate from the previous app at the repository root.
  turbopack: { root: __dirname },
};
export default config;
