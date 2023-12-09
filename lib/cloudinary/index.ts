import 'server-only';

import { v2 } from 'cloudinary';

v2.config({
  secure: true,
});

export const cloudinary = v2;
