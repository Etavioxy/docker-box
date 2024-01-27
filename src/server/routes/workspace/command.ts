import express from 'express';
import { config } from '../../setup.js';
import fetch from 'node-fetch';

const userdataDir = config.userdata;
const registry = config.registry;

console.log('userdata', userdataDir);
console.log('registry', registry);

const router = express.Router();

//TODO commands select
router.get('/workspace/:workspaceid/command', async (_req, res) => {
  const url = registry + '/v2/_catalog';
  const response = await fetch(url);
  const data = await response.json();
  res.send(data);
});

import { promisify } from 'node:util';
import { exec as exec_ } from 'node:child_process'
const exec = promisify(exec_);

router.get('/workspace/:workspaceid/command/:command/help', (req, res) => {
  const cmd = `docker exec ${registry} ${req.params.command} --help`; // 替换为您要执行的命令
  console.log('Command:', cmd);
  res.send(500);
});

router.post('/workspace/:workspaceid/command/:command', async (req, res) => {
  console.log(registry, req.params, req.params.workspaceid, req.params.command);
  const workspaceDir = `${userdataDir}/workspace/${req.params.workspaceid}/${req.body.dir}`;

  const cmd = `docker run --rm -v ${workspaceDir}:/app ${registry}/${req.params.command} ${req.body.arg}`;

  console.log('Command:', cmd);

  try {
    const { stdout, stderr } = await exec(cmd);
    if (stderr.trim() !== '') console.log('[stderr] command:', cmd, 'stderr:', stderr);
    res.send(stdout);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


export default router;
