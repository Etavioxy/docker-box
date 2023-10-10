import express from 'express';
import multer from '../../middlewares/multer.js';
import path from 'path';
import {config} from '../../setup.js';
import fs from 'fs-extra';

const router = express.Router();

// 上传文件接口
router.post('/workspace/:workspaceid/file/:filepath?', multer.single('file'), (req, res) => {
  res.sendStatus(200); // 文件上传成功
});

// 获取文件列表接口
router.get('/workspace/:workspaceid/filelist/:filepath?', async (req, res) => {
  const { workspaceid, filepath } = req.params;
  const { createDir } = req.query;
  console.log('filelist', workspaceid, filepath, 'createDir', createDir);

  const fullpath = path.join(config.dirs.workspace, workspaceid, filepath || '');

  try {
    console.log('fullpath', fullpath);
    const exists = await fs.pathExists(fullpath);
    if (!exists) {
      if (createDir) {
        fs.ensureDir(fullpath);
      } else {
        res.sendStatus(404);
        return;
      }
    }

    const stats = await fs.stat(fullpath);
    if (stats.isDirectory()) {
      const files = await getFolderTree(fullpath);
      res.json(files);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

async function getFolderTree(folderPath: string) {
  const files = await fs.readdir(folderPath);
  const tree = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = await fs.stat(filePath);
    const node = {
      name: file,
      isDirectory: stats.isDirectory(),
    };

    if (stats.isDirectory()) {
      node.children = await getFolderTree(filePath);
    }

    tree.push(node);
  }

  return tree;
}

// 下载文件接口
router.get('/workspace/:workspaceid/file/download/:filepath', async (req, res) => {
  const { workspaceid, filepath } = req.params;
  const fullpath = path.join(config.dirs.workspace, workspaceid, filepath);

  try {
    const exists = await fs.pathExists(fullpath);
    if (!exists) {
      res.sendStatus(404);
      return;
    }

    const stats = await fs.stat(fullpath);
    if (stats.isDirectory()) {
      const files = await fs.readdir(fullpath);
      res.json(files); // TODO return zip
    } else if (stats.isFile()) {
      res.download(fullpath, (err) => { throw err });
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete('/workspace/:workspaceid/file/:filepath', async (req, res) => {
  const { workspaceid, filepath } = req.params;
  const fullpath = path.join(config.dirs.workspace, workspaceid, filepath);

  try {
    const exists = await fs.pathExists(fullpath);
    if (!exists) {
      res.sendStatus(404);
      return;
    }

    const stats = await fs.stat(fullpath);
    if (stats.isDirectory()) {
      await fs.remove(fullpath);
      res.sendStatus(200);
    } else if (stats.isFile()) {
      await fs.unlink(fullpath);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

export default router;
