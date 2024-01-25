import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const router = express.Router();

import { config } from '../setup.js';

router.use(
  '/webdav',
  createProxyMiddleware({
    target: 'http://localhost:4881',
    changeOrigin: true,
    pathRewrite: {
      '^/api/webdav': '',
    },
  })
);

export default router;
