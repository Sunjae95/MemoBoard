const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const bcrypt = require('bcryptjs');
const {
    isLogged,
    isNotLogged
} = require('./middlewares');

//로그인
router.post('/login', isNotLogged, async (req, res) => {
    try {
        const {
            id,
            password
        } = req.body;

        if (!id || !password) {
            console.log('아이디 및 비밀번호를 쓰세요');
            return res.redirect('/');
        }
        const checkId = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!checkId[0][0] || !(await bcrypt.compare(password, checkId[0][0].password))) {
            console.log('아이디 또는 비밀번호가 틀렸습니다.');
            return res.redirect('/');
        } else {
            const token = await jwt.sign({
                id
            }, process.env.JWT_SECRET);
            await db.query('UPDATE users SET token = ? WHERE id = ?', [token, id]); //db token 저장

            res.cookie('user', token) //로컬 쿠키에 token저장
                .status(200)
                .redirect('/board');
        }
    } catch (error) {
        console.log(error);
    }
});
//회원가입
router.post('/register', isNotLogged, async (req, res) => {
    const {
        id,
        password
    } = req.body; // -> { id: "adf", password: "123" }

    const [
        [registerId]
    ] = await db.query('SELECT id FROM users WHERE id = ?', [id]);

    try {
        if (registerId) {
            console.log('아이디 중복');
        } else {
            let hashedPassword = await bcrypt.hash(password, 8);
            await db.query('INSERT INTO users SET ?', {
                id: id,
                password: hashedPassword,
            });

            console.log('아이디 가입 승인');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
});
//로그아웃
router.get('/logout', isLogged, async (req, res) => {
    try {
        await db.query('UPDATE users SET token = ? WHERE token = ?', [null, req.cookies.user]);
        res.clearCookie('user').redirect('/');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;