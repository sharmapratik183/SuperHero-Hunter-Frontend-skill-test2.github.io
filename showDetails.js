const heroName = document.getElementById("hero-name");
const img = document.getElementById("img");
const info2 = document.getElementById("info2");              //powerstats
const moreinfo = document.getElementById("moreinfo");                  //bio
let more=document.getElementById("more");




// call the update UI method when the window is loaded
window.onload = function(){
    let winurl = window.location.href;
    let id = winurl.substring(winurl.lastIndexOf('=')+1);
    updateUI(id);
  }


  // update UI from fetched data
async function updateUI(id){
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42&ts=1`
    let data = await fetchAsync(url);
    console.log(data.data.results[0].name);
    
      heroName.innerHTML = data["data"]["results"]["0"]["name"];
      img.src = `${data["data"]["results"]["0"]["thumbnail"]["path"]}`+ "." + `${data["data"]["results"]["0"]["thumbnail"]["extension"]}`;
      document.getElementById("id1").appendChild(document.createTextNode(`ID: ${data["data"]["results"]["0"]["id"]}`));
      document.getElementById("description").appendChild(document.createTextNode(`Description: ${data["data"]["results"]["0"]["description"]}`));
      let btn=document.createElement("a");
      btn.href=data["data"]["results"]["0"]["urls"]["0"]["url"];
      btn.innerHTML="MORE INFORMATION";
      more.appendChild(btn);

      
       
    
  }
  
  // fetch data from API
  async function fetchAsync (url) {
    try{
      let response = await fetch(url);
      let data = await response.json();
      return data;  
    }catch(err){
      console.log(err);
    }
  }