import fs from 'fs';
import process from 'process';

const args = process.argv.slice(2); // [ '-c', 'config.json' ]

const params = {};
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('-')) {
    const name = arg.slice(1);
    const value = args[i + 1];
    params[name] = value;
    i++;
  }
}

const configFileName = fs.existsSync(params.c) ? params.c : 'config/env.json'; // 获取配置文件名
console.log('using config file:', configFileName);
const configContent = fs.readFileSync(configFileName, 'utf-8'); // 读取配置文件内容
const config = JSON.parse(configContent); // 解析配置文件内容为一个对象

// 打印结果
console.log('port:', config.port);
console.log('workspaceDir:', config.dirs.workspace);
console.log('shareDir:', config.dirs.share);

config.secretKey = config.secretKey || 'your-secret-key';

export {config};
