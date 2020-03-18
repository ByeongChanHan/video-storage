from selenium import webdriver
# 웹드라이버 메소드를 import
from bs4 import BeautifulSoup
# beautifulsoup를 import (크롤링전용)
import json
# json을 import해준다
import requests
# 요청에 관한것을 import
songTitle_list = list()
    # 딕셔너리를 넣을 리스트(배열)을 만들고

with open("./public/json/TitleData.json",'r') as f:
    # 현재 위치에서 TitleData.json을 찾고 r = read 방식으로 읽어서 f변수에 저장
    json_data = json.load(f)
    # json_data변수에는 아까 저장했던 f변수를 불러와서 그 데이터를 저장
    print(json.dumps(json_data,indent="\t"))
    # dumps로 tab옵션을 줘서 세로로 데이터를 출력
JSONaddressData = json_data[len(json_data)-1]["AddressData"]
# 마지막 배열에 접근(마지막으로 추가한 주소의 데이터를 읽어야 하기 때문) 키는 AddressData의 값을 읽는다
print(JSONaddressData)

res = requests.get(JSONaddressData)
# res 변수는 마지막으로 추가한주소를 get방식으로 요청
soup = BeautifulSoup(res.content,'html.parser')
# 그 요청한 페이지의 내용을 parse하고 soup변수에 저장
TitleData = soup.select("html head title")
# 제목은 html밑 head밑 title태그안에 있기때문에 select메소드로 선택해주고 TitleData에 저장합니다
print(TitleData)
for item in TitleData:
    # TitleData를 item에 넣어주고
    result = item.text
    # item의 문자를 result변수로 저장합니다
    songTitle_dict = dict()
    # soneTitle_group이라는 딕셔너리(객체)를 만들고
    songTitle_dict["titleName"] = result
    # songWriter라는 키에 데이터저장
    songTitle_list.append(songTitle_dict)
    # 추가된 객체를 배열에 추가 시킴
    with open("./public/json/songTitle.json",'w',encoding='utf-8') as w_file:
        # songTitle.json에 w(write)방식으로 쓰고 utf-8으로 인코딩하면서 w_file변수에 저장
        json.dump(songTitle_dict,w_file,ensure_ascii=False,indent='\t')
        # json.dump메소드로 아까 딕셔너리를 만든 것을 추가하고 아스키코드 문자를 허용하지않으며 tab옵션을 줘 세로형태로 정렬
        # encoding하고 ensure_ascii옵션을 저렇게 설정해줘야 한글깨짐현상이 없음