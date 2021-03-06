filterSelection("animals");
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c === "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

const url = "https://api-euwest.graphcms.com/v1/ck3ohp7e3nq9e01ff33nm3ipb/master";
function getQueryVariable(variable)
{
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=");
        if(pair[0] === variable){return pair[1];}
    }
    return(false);
}

let user = getQueryVariable('id');
console.log(user);

let room = `{
  users(where:{id:"${user}"}){
    name
    rooms{
      zones{
        nameZone
        bodyZone
        smallBodyZone
      }
      nameRoom
      id
    }
    pageRutines{
      id
      time
    }
    menus{
      id
    }
  }
}`;
axios.post(url, {query: room})
  .then(response => {
    console.log(response.data);
    let timeRut = response.data.data.users.pageRutines;
    let room = response.data.data.users.rooms;
    let idMenu = response.data.data.users.menus[0].id;
    let zonesArr = response.data.data.users.rooms[0].zones;

    let name = document.getElementById("name");
    name.textContent = "Привет, " + response.data.data.users.name;
    
    let kitchen = document.getElementById("kitchen");
    let bathrom = document.getElementById("bathrom");
    let bedroom = document.getElementById("bedroom");
    let livroom = document.getElementById("livroom");
    let hallway = document.getElementById("hallway");
    let dayRout = document.getElementById("dayRout");
    let evnRout = document.getElementById("evnRout");
    let exsWeak = document.getElementById("exsWeak");
    let wekMenu = document.getElementById("wekMenu");
    let setting = document.getElementById("setting");
    let submit  = document.getElementById("submit");


    dayRout.onclick = function(e){
      e.preventDefault();
      document.location.href = "rutina_new.html?id=" + user + "&time=" + timeRut[0].id;
    }
    evnRout.onclick = function(e){
      e.preventDefault();
      document.location.href = "rutina_new.html?id=" + user + "&time=" + timeRut[1].id;
    }
    exsWeak.onclick = function(e){
      e.preventDefault();
      document.location.href = "work_week_new.html?id=" + user;
    }
    wekMenu.onclick = function(e){
      e.preventDefault();
      document.location.href = "menu_report.html?id=" + user + "&menu=" + idMenu;
    } 
    kitchen.onclick = function(e){
      e.preventDefault();
      document.location.href = "pred_zone.html?id=" + user + "&room=" + room[0].id;
    }
    bathrom.onclick = function(e){
      e.preventDefault();
      document.location.href = "pred_zone.html?id=" + user + "&room=" + room[1].id;
    }
    bedroom.onclick = function(e){
      e.preventDefault();
      document.location.href = "pred_zone.html?id=" + user + "&room=" + room[2].id;
    }
    livroom.onclick = function(e){
      e.preventDefault();
      document.location.href = "pred_zone.html?id=" + user + "&room=" + room[3].id;
    }
    hallway.onclick = function(e){
      e.preventDefault();
      document.location.href = "pred_zone.html?id=" + user + "&room=" + room[4].id;
    }       
    setting.onclick = function(e){
      e.preventDefault();
      document.location.href = "setting.html?id=" + user;
    }
    submit.onclick = function(e){
      e.preventDefault();
      document.location.href = "zone.html?id=" + user + "&room=" + room[0].id 
                            +"$zone=" + room[0].zones[0].nameRoom;
    } 

});