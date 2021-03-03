const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLogged } = require('./middlewares');

//초기화면
router.get('/', function(req, res, next) {
  res.render('index');
});
//로그인이 되어있으면 불러오기
router.get('/board', isLogged, async (req, res) => {
  const [row]  = await db.query('SELECT num, id, title, DATE_FORMAT(date, "%Y/%m/%d") as date FROM board');
  res.render('board',{
    row: row,
  });
});

//로그인화면
router.get('/login', (req, res) => {
  res.render('login');
});
//회원가입화면
router.get('/register',(req,res)=>{
  res.render('register');
});



module.exports = router;
