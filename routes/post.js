const express = require('express');
const router = express.Router();
const db =require('../db');
const { isLogged } = require('./middlewares');

//글쓰기 이동
router.get('/', (req, res) => {
    res.render('post');
});

//게시글 저장
router.post('/', isLogged ,async (req, res) => {
    //db저장
    //num, id는 db에서 불러오기
    //num은 고유번호로 게시물 순서를 나타낸다.
    [ num ] = await db.query('SELECT num FROM board ORDER BY num DESC limit 1');
    let getNum = 0;
    if(num[0] === undefined) {
        getNum = 1;
    }else if(num[0].num>0) {
        getNum = num[0].num+1;
    }
    //id db에서 불러오기
    const [ getId ] = await db.query('SELECT id FROM users WHERE token = ?', [ req.cookies.user ]);
   
    //title, contents, date post받아서 
    const { title, contents} = req.body;
    const nowTime = new Date();
    await db.query('INSERT INTO board SET ?',{
        num: getNum,
        id: getId[0].id,
        title: title,
        contents: contents,
        date: nowTime});

    res.redirect('/board');
});

//게시글 읽기
router.get('/read/:num', async (req, res) => {
    const num = req.params.num;
    const [[row]] = await db.query('select num,title,contents,id,DATE_FORMAT(date, "%Y/%m/%d %T") as date from board where num=?',[ num ]);
    res.render('postRead',{title: row.title, row: row});
    //postRead 파일 만들것!!
});

module.exports = router;
