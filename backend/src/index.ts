import { config } from './setup.js';

import app from './app.js';

//if( config.frontend.listen ){
//  console.log('Server listen on frontend port '+config.frontend.port);
//  // 将 get '/' 路径下的请求转发到 http://localhost:5173
//  app.use('/*', createProxyMiddleware({ target: 'http://localhost:' + config.frontend.port, changeOrigin: true }));
//}

app.listen(config.port, () => {
  console.log('Server is running on port '+config.port);
});
