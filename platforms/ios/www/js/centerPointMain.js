var C = {};
C.position = [];
C.page = 0;
C.people = 2;
C.peopleI

function resizeMap() {
  document.getElementById("map").style.height = ($("#tab4").height() -56) + "px";
}

function resizeMap2() {
  $("#tab5").height();
  document.getElementById("map2").style.height = $("#tab5").height() * 0.45 + "px";
  document.getElementById("map2").style.float = top;
  $("#Tab2_li_d").height($("#tab5").height() - ($("#tab5").height() * 0.45) - 56);
}

function optionChoice() {

}


function pageControl(nextTab) {
  location.href = '#' + nextTab;
  anchorControl();
}

function anchorControl() {

  var url = window.location.href;
  var slide = url.substring(url.lastIndexOf('#') + 1);
  if (slide > 1 && slide < 10)
    goToTab(parseInt(slide));
  else {
    goToTab(1);
  }

}

function goToTab(number) {
  app.tab.show('#tab'+number,true)
}


function peopleCount(count) {
  C.people = parseInt(count);
  $("#Tab2_select").val(count);
}

function tab2ListCreate() {
  $("#Tab2_li").empty()
  $("#Tab2_li_d").empty()
  for (var i = 0; i < C.people; i++) {
    $("#Tab2_li").append('<div id="Tab2_li_' + i + '" style="background: #68b5cc; position:relative; height:45px; width: 90%; margin-left: auto; margin-right: auto; border-radius: 10px"> <img src="./img/p' + i + '.png"  style="height: 30px; width:30px; position:absolute; left:20px; top:12%"> <p id="placeString_'+i+'" style="height: 30px; width:100%; position:absolute; left:0%; top:0%;color: white;"> ' + (i + 1) + '번이용자 </p><img src="./img/d.png"  style="height: 30px; width:30px; position:absolute; right:20px; top:12%" onclick="pageControl(4),setLocation(' + i + ')"></div><br>');
    $("#Tab2_li_d").append('<br><div id="Tab2_li_' + i + '" style="background: #68b5cc; position:relative; height:45px; width: 90%; margin-left: auto; margin-right: auto; border-radius: 10px"> <img src="./img/p' + i + '.png"  style="height: 30px; width:30px; position:absolute; left:20px; top:12%"> <p id="placeString_d_'+i+'" style="height: 30px; width:100%; position:absolute; left:0%; top:0%;color: white;"> ' + (i + 1) + '번이용자 </p><img src="./img/s.png"  style="height: 30px; width:30px; position:absolute; right:20px; top:12%" onclick="sharePosition('+i+')"></div>');
  }
  $("#Tab2_li").append('<div id="Tab2_li_b" style="position:relative; height:50px; width: 100%; margin-left: auto; margin-right: auto;" > <img src="./img/b.png"  style="height: 50px; width:50px; display: inline-block;" onclick="serchCenter(), resizeMap2()"> </div>');
}

function serchCenter(){
  if(C.people == C.position.length){
    pageControl(5);
  }
  else{
    alert("장소를 모두 입력해야 합니다.");
  }

}

function setLocation(i) {
  C.peopleIndex = i;
}

function sharePosition(i) {
console.log(i);

var url = 'http://m.map.naver.com/route.nhn?menu=route&sname='+C.position[i].name+'&sx='+C.position[i].lng+'&sy='+C.position[i].lat+'&ename='+C.centerPosition.name+'&ex='+C.centerPosition.lng+'&ey='+C.centerPosition.lat+'&pathType=1&showMap=true';
console.log(url)
// navigator.share("1","1","1");
window.plugins.socialsharing.share('[너와 나의 연결 거리]', null, null, url);
}

function findCenter() {

  if (C.position.length == C.people) {

    var total_lat = 0,
      total_lng = 0;
    for (var i = 0; i < C.position.length; i++) {
      total_lat += C.position[i].lat;
      total_lng += C.position[i].lng;
    }
    total_lat /= C.position.length;
    total_lng /= C.position.length;
    C.centerPosition = {
      lat: total_lat,
      lng: total_lng
    };
    console.log(C.centerPosition,"중앙좌표")
    findSubway(C.centerPosition);
  }



}