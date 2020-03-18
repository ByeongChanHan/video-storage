module.exports = function(app)
//모듈화 시킬것인데 app이라는 매개변수가 있음
{
     app.get('/',function(req,res){
        res.render('PageMain.html')
        //요청이 오면 반응으로 html렌더링
     });
     //get방식 요청으로 기본값인 localhost:3000일때 메인 페이지를 불러옵니다
     app.post('/login',function(req,res){
        res.render('login.html')
     });
     // url이 /login일때 post요청이 오면 login.html을 표시
     app.post('/musiclist',function(req,res){
      res.render('musiclist.html')
   });
}