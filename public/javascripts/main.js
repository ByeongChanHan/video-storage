var AddressText = document.getElementById("siteAddress");
//검색 칸 id 추출
var Isclicked = document.getElementById("Uploadbtn");
//업로드 버튼 id 추출
var resultData;
//버튼을 눌렀을때 데이터를 추가할값

var data = new Array();
        //json 데이터 배열

$(document).ready(function(){
    $('.siteExplain').animate({
        opacity:'1'
    },1500);
    //메인페이지가 로드 되면 애니메이션으로 글씨가 나타남
    //구글링 해본 결과 fadein 함수로 코드를 짤수도 있음
    $('.gosearchArea').click(function(){
        var offset = $('#navi').offset();
        $('html').animate({scrollTop : offset.top}, 400);
    });
    //go to main page를 클릭했을때 동작하는 함수 animate로 부드럽게 움직여줌
});
function moveIcon(){
    $('#arrowIcon').animate({top:'5px'},500);
    $('#arrowIcon').animate({top:'35px'},500);
    }
setInterval(function() {
        moveIcon();
  }, 1000);
//아이콘을 계속 움직이게끔 설정
Isclicked.addEventListener("click",UploadClick);
//클릭할때 이벤트 리스너가 uploadclick함수를 호출

function UploadClick(){
    if(AddressText.value != ""){
        var Addressvalue = new Object();
        //주소 객체 생성
        Addressvalue.AddressData = AddressText.value;
        //입력한 주소의 value를 AddressData키의 value에 넣음
    var req = new XMLHttpRequest();
    //req변수로 요청을 받음
    req.open("GET","public/json/TitleData.json");
    //get방식으로 로컬에서 가져오기
    req.send();
    //그걸 보내고
        data.push(Addressvalue);
             //json 데이터를 담는 배열에 키값이 AddressData인 객체를 추가해준다
        resultData = JSON.stringify(data);
             //데이터 배열을 json화
        req.open("POST",'/');
                //post방식으로 다시 열어주는데 라우팅은 기본 html(localhost:3000)에서 뒤에 더 붙지않음 <= '/'
        req.setRequestHeader('Content-Type', 'application/json');
                //헤더 타입은 json헤더타입으로 설정
        req.send(resultData);
                //json화 한 데이터를 post형식으로 보내줌
        req.abort();
        //요청 종료
    document.getElementById("video").innerHTML+=
    '<div style="display:inline-block; width:350px"><iframe width="300" id = "youtube" height="200" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><span id = "title" onclick="SelectTitle()"></span></div>';
        //videoid에 html코드를 추가 (유튜브 소스)
    var iframeId = document.querySelector("#youtube");
        //유튜브영상 아이디를 고르고
    var youtubeAddressConverter = AddressText.value;
    //입력값을 youtubeAddressConverter변수에 저장후

    var cutter = youtubeAddressConverter.substring(0,24);
    //유튜브.com/까지 잘라서 변수에 저장
    var videoidCutter = youtubeAddressConverter.substring(32,43);
    //나머지 비디오 id부분 커트
    var videoSrcResult = cutter + "embed/" + videoidCutter;
    //주소링크를 변환시킨 결과값
    iframeId.src = videoSrcResult;
    //주소의 src는 주소변환값
    iframeId.removeAttribute('id');
    //아이디 속성값을 제거(쿼리 셀렉터할때 첫번째로 나타나는 id를 찾기 때문)
    setTimeout(function() {
        var xhr = new XMLHttpRequest();
        // 다시 요청을 불러온다
        // setTimeout을 호출한 이유는 json파일이 다쓰이는 시간이 약 3초정도돼서 3초후 실행
        xhr.open("GET","public/json/songTitle.json");
        // get방식으로 다시 불러오고
        xhr.send();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                // 수신양호일때
            var ShowTitle = JSON.parse(this.responseText);
            // json응답후 그 텍스트를 자바스크립트 객체로 parse시켜준다
            var get_Title = document.getElementById("title");
            // 제목쓰여지는 p태그의 id title을 찾은후
            var splitData = ShowTitle.titleName;
            // 제목을 쪼개기위해 splitData 변수에 저장
            var completesplit = splitData.substring(0,splitData.length - 10);
            // 그 변수에 첫번째 글자부터 마지막에서 10번째를 뺀 글자까지( - youtube) 제외하고 자른다
            get_Title.innerText = completesplit;
            // p의 텍스트는 분할한 텍스트이고
            get_Title.style.color = "white";
            get_Title.style.fontSize = "15px";
            get_Title.style.display = "inline-block";
            get_Title.style.width = "300px";
            get_Title.style.paddingLeft ="25px";
            // 텍스트의 스타일 설정값
            get_Title.setAttribute('class','clickTitle');
            get_Title.removeAttribute('id');
            // id값을 지워줌
            }
        };
      }, 4000);
    }
}
AddressText.onclick = function(){
    AddressText.value="";
    //주소칸을 클릭하면 자동으로 빈칸 초기화
}