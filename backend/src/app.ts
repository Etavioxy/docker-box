import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import auth from './middlewares/auth.js';

app.use(
  auth.unless((req) => {
    // 不以/api开头的路径会被排除
    // 以/api/user开头的路径会被排除
    const url = req.originalUrl;
    return ! /^\/api/.test(url) || /^\/api\/user/.test(url)
  })
);

const routers = [
  await import('./routes/user.js'),
  await import('./routes/registry.js'),
  await import('./routes/workspace/index.js')
];

routers.map(router => { app.use('/api', router.default); });

export default app;
