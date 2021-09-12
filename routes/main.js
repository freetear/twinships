var express = require('express');
var router = express.Router();

router.get('/login', (req, res, next) => { 
  // 구글 로그인 시도 
  res.render('main/login'); 
});

router.post('/login_', (req, res, next) => { 
  // 유저가 입력한 정보가 맞는지 체크 
  firebase.auth().signInWithEmailAndPassword(req.body.id, req.body.passwd) 
  .then( firebaseUser => { 
    console.log(firebaseUser)
    res.render('main/index', {title : "이메일 로그인 완료!!!"}) 
  })
  .catch( err => { 
    console.log(err); 
    res.redirect('login') 
  }) 
})

module.exports = router;
