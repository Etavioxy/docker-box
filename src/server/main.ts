import ViteExpress from "vite-express";

import app from './app.js';

import { config } from './setup.js';

ViteExpress.listen(app, config.port, () =>
  console.log("Server is listening on " + config.port + " ..."),
);
