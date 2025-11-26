import { createRequire } from 'node:module';
import { cssescDistPath } from './cssesc-path.mjs';

const requireCssesc = createRequire(import.meta.url);
const cssesc = requireCssesc(cssescDistPath);

export default cssesc;
export { cssesc };

