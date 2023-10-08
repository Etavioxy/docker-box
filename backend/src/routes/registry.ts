import express from 'express';
import path from 'path'
import {config} from '../setup.js'

const router = express.Router();

router.get('/registry/*', async (req, res) => {
  try {
    const url = path.join(config.registry, req.params[0]); // "https://registry.halzi.one:5000"
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

export default router;
