const express = require('express');
const router = express.Router();
const db = require('../db');
const { isLogged } = require('./middlewares');

router.get('/', isLogged, async (req, res) => {
    try{
        const [ getId ] = await db.query('SELECT id FROM users WHERE token = ?', [ req.cookies.user ]);
        const [row]  = await db.query('SELECT num, id, title, DATE_FORMAT(date, "%Y/%m/%d") as date FROM board WHERE id = ?', getId[0].id);
        
        res.render('mypage',{row: row});
    }catch (err) {
        console.log(err);
    }
});
//내가 쓴 글 읽기
router.get('/:num', isLogged, async(req, res) => {
    try{ 
        const num = req.params.num;
        const [[row]] = await db.query('SELECT num, title, contents FROM board WHERE num = ?', [ num ]);
        console.log(row);
        res.render('postEdit',{title: row.title, row:row});
        // res.json({success: "ok"});
    } catch (err) {
        console.log(err);
    }
});

//내가 쓴 글 수정하기
router.post('/update/:num', isLogged, async(req, res) => {
    try{
        const num = req.params.num;
        const { title, contents }= req.body;
        await db.query('UPDATE board SET contents = ?, title = ? WHERE num = ?', [ contents, title , num ]);
        res.redirect('/mypage');
    } catch (err) {
        console.log('err: ', err);
    }
});
//내가 쓴 글 삭제하기
router.post('/delete/:num', isLogged, async(req, res) => {
    try{
        const num = req.params.num;
        await db.query('DELETE FROM board WHERE num = ?', [ num ]);
        res.redirect('/mypage');
    } catch (err) {
        console.log('err: ',err);
    }
});
module.exports = router;