import express from 'express';
import path from 'path'
import {config} from '../setup.js'
import cache from '../middlewares/cache.js'
import fetch from 'node-fetch';

const router = express.Router();

// 使用缓存中间件，设置缓存时间为 30 秒
router.get('/registry/*', cache(30), async (req, res) => {
  try {
    const url = path.join(config.registry, req.params![0] as string);
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("please set registry url correctly");
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
