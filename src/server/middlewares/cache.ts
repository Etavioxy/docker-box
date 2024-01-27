import mcache from 'memory-cache';

// 创建一个缓存中间件函数
export default (duration: number) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // 从请求中获取路由路径作为缓存键
    const key = '__express__' + req.originalUrl || req.url;
    // 尝试从缓存中获取数据
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      // 如果缓存中有数据，直接发送响应
      res.send(cachedBody);
      return;
    } else {
      // 如果缓存中没有数据，使用 res.send 的副本来存储数据
      res.sendResponse = res.send;
      res.send = (body: any) => {
        // 在发送响应之前，将数据存入缓存
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      // 调用下一个中间件或路由处理器
      next();
    }
  };
};

