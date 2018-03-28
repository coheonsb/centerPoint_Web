var C = {};
C.position = [];
C.page=0;
C.people = 2;
C.peopleI

function resizeMap(){
    var mainClass = document.getElementById("mainDiv");
  document.getElementById("map").style.height = mainClass.offsetHeight * 0.87  +"px";
}
function optionChoice(){
    
}


function pageControl(nextTab){
  location.href='#'+nextTab.id;
  anchorControl();
}

function anchorControl(){

  var url = window.location.href;
  var slide = url.substring(url.lastIndexOf('#') + 1 + 3);
  if (slide > -1 && slide < 10)
    goToSlide(parseInt(slide));
  else {
    goToSlide(0);
  }

}




function peopleCount(count){
  C.people = parseInt(count);
  $("#Tab2_select").val(count);
}

function tab2ListCreate(){
  $("#Tab2_li").empty()
 for(var i=0; i<C.people;i++){
      $("#Tab2_li").append("<li>"+  (i+1) +"번이용자<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' onclick='pageControl(tab3),setLocation("+i+")'>확인</button></li><br>");  
 }
}

function setLocation(i){
  C.peopleIndex = i;
}

function goToSlide(number) {
  $(".carousel").carousel(number);
}