import express from 'express';
import path from 'path';
import { config } from '../../setup.js';
import fetch from 'node-fetch';

const registry = config.registry;

console.log('registry');
console.log(registry);

const router = express.Router();

router.get('/command', (req, res) => {
  res.send(fetch(registry + '/v2/_catalog')); //TODO CORS
});

import { exec } from 'child_process';

router.get('/command/:command', (req, res) => {
  const command = 'docker exec -it ' + registry + req.params.command + ' --help'; // 替换为您要执行的命令
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      console.error('[E] ', stderr);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send(stdout);
    }
  });
  res.send();
});

router.post('/command/:command', (req, res) => {
  res.sendStatus(200);
});

export default router;
