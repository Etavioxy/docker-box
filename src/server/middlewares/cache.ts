import mcache from 'memory-cache';
import { Request, Response, NextFunction, Send } from 'express';

// 创建一个缓存中间件函数
export default (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
      const sendResponse = res.send;
      res.send = ((body: any) => {
        // 在发送响应之前，将数据存入缓存
        mcache.put(key, body, duration * 1000);
        sendResponse.call(res, body);
      }) as Send;
      // 调用下一个中间件或路由处理器
      next();
    }
  };
};

