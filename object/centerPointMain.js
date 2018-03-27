var C = {};
C.position = [];
C.page=0;
C.people = 2;
C.peopleI

function resizeMap(){
    var mainClass = document.getElementById("mainClass");
  document.getElementById("map").style.height = mainClass.offsetHeight +"px";
}
function optionChoice(){
    
}


function pageControl(tabName,nextTab){
  var className =tabName.className;
  tabName.className = className.replace('is-active','');
  location.href='#'+nextTab.id;
 
  
}

function peopleCount(count){
  C.people = parseInt(count);
  $("#Tab2_select").val(count);
}

function tab2ListCreate(){
  $("#Tab2_li").empty()
 for(var i=0; i<C.people;i++){
      $("#Tab2_li").append("<li>"+  (i+1) +"번이용자<button class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent' onclick='pageControl(Tab2,Tab3),setLocation("+i+")'>확인</button></li><br>");  
 }
}

function setLocation(i){
  C.peopleIndex = i;
}