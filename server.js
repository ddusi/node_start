const express = require('express');
// 아까 설치한 라이브러리를 불러주세요.
const app = express();
// 그것을 객체 할당해주세요.

// listen(서버 띄울 포트번호, 띄운 후 실행할 코드)

app.listen(8080, function(){
    console.log('listening on 8080')
});

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html');
});

app.get('/beauty', function(req, res){
    res.send('뷰티용품을 쇼핑 할 수 있는 페이지입니다.');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

