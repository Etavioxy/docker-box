import express from 'express';
import sequelize from '../sequelize-models.js';

const {models} = sequelize;

const router = express.Router();

import bcrypt from 'bcrypt';

//密码hash校验
const validate = async (password,hash) => {
    const match = await bcrypt.compare(password, hash);
    return match
};

router.post('/user/register', async (req, res) => {
    const {email,password} = req.body
    const user = await models.user.create({
        email,
        password,
        createAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    })
    res.status(201).json(user)
});

import jwt from 'jsonwebtoken';

import { config } from '../setup.js';

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await models.user.findOne({
        where: {
            email
        }
    });
    if (user && await validate(password, user.password)) {
        // 生成JWT令牌
        const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '1M' });
        res.status(200).json({ user, token }); // 将令牌一同返回给客户端
    } else {
        res.status(401).send('401 - incorrect password');
    }
});

//router.post('/user/logout', async (req, res) => {
//    // 这里的登出逻辑可以根据实际需求进行处理
//    // 如果你想要在登出时使令牌失效，可以将令牌存储到黑名单中，然后在每次请求中验证令牌是否在黑名单中
//    // 在此只返回用户信息示例
//    const { id } = req.body;
//    const user = await models.user.findOne({
//        where: {
//            id
//        }
//    });
//    res.status(200).json(user);
//});

router.put('/user/password', async (req, res) => {
    const {id,old,newv} = req.body
    const user = await models.user.findOne({
        where: {
            id
        }
    })
    if (user && await validate(old, user.password)) {
        user.password = newv;
        user.updatedAt = new Date().toISOString()
        res.status(200).json(user)
    } else {
        res.status(401).send('401 - incorrect password');
    }
});

export default router;
