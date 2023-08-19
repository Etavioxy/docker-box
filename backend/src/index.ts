
import path from 'path';

const __dirname = path.resolve('./');

console.log(__dirname)

import { config } from './setup.js';

import app from './app.js';

app.listen(config.port, () => {
  console.log('Server is running on port '+config.port);
});
