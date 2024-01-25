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
    console.log('qwq');
    const { email, password } = req.body;
    const user = await models.user.findOne({
        where: {
            email
        }
    });
    if (user && await validate(password, user.password)) {
        // 生成JWT令牌
        const token = jwt.sign({ userId: user.id }, config.secretKey, { expiresIn: '24h' });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1);
        res.status(200).json({ user: user.email, token, expiresAt }); // 将令牌一同返回给客户端
    } else {
        res.status(401).send('401 - incorrect password');
    }
});

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
