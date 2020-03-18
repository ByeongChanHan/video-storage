let {PythonShell} = require('python-shell');
//파이썬을 실행 가능하게 만드는 파이썬 쉘 모듈 사용
var express = require('express');
//nodejs프레임워크 express모듈 사용
var path = require('path');
//경로 모듈 사용
const fs = require('fs');
//파일시스템 모듈 사용
var bodyParser = require('body-parser');
var app = express();
//app은 express함수
var router = require('./routes/mainRoute')(app);
//mainRoute.js를 app변수에 보내줌
                                                           
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set('views', __dirname + '/views');
// html의 위치는 현재 실행되고있는 경로에 /views경로를 붙여준 경로
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//html을 ejs 뷰 엔진으로 렌더링 한다는 얘기

var server = app.listen(3000,function(){
  console.log("서버 3000번 시작");
});
app.use('/public',express.static(path.join(__dirname,'public')));
// //public 경로를 통해 public 아래에있는 파일을 로드
app.use(express.static('public'));
//사진을 로드하는 코드

app.post('/',function(req,res){
  //post에 기본값 localhost:3000이 오면
  var changer = JSON.stringify(req.body);
  //req.body는 요청으로 보낸 resultData의 값을 다시한번 json화
  fs.writeFile("./public/json/TitleData.json",changer,'utf8',function(err){
    //파일시스템 모듈을 이용해 TitleData.json파일 에 json형태인 changer변수를 씁니다
     if(err){
       console.log("json쓰기에 실패하였습니다");
       return console.log(err);
     }
     //에러가 나면 에러 출력하는 부분
     console.log("json파일에 쓰기 성공!");
     //json쓰기에 성공할 경우
   })
   PythonShell.run('SaveTitle.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });
  //파이썬을 실행하는부분
 })