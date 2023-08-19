import { expressjwt } from "express-jwt";
import { config } from '../setup.js';

console.log('secretKey:', config.secretKey);

// 身份验证中间件
const authenticateJWT = expressjwt({
  secret: config.secretKey,
  algorithms: ["HS256"]
})

export default authenticateJWT;
