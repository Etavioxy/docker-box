import multer from 'multer';
import {config} from '../setup.js';
import path from 'path';

// 设置存储引擎和文件保存路径
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(config.dirs.workspace, req.params.workspaceid, req.params.filepath));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// 创建 multer 实例
const upload = multer({ storage });

export default upload;
