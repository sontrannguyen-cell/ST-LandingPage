import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * The @swc/core native addon — pulled in by next-intl's Next plugin — refuses to
 * materialise into the default user cache (%LOCALAPPDATA%\swc) when that
 * directory's ACL grants replacement rights to an AppContainer SID. That is the
 * case on Windows under a sandboxed shell, and it fails the whole config load.
 *
 * Pointing the cache at a project-local directory sidesteps it. This must happen
 * before @swc/core is required, hence the dynamic import of the plugin below.
 */
if (!process.env.SWC_NATIVE_BINDING_CACHE) {
  const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'swc');
  fs.mkdirSync(cacheDir, { recursive: true });
  process.env.SWC_NATIVE_BINDING_CACHE = cacheDir;
}

const { default: createNextIntlPlugin } = await import('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default withNextIntl(nextConfig);
