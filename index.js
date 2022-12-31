// public key: 123aac12be0dba2ca5cfe0d5da55aefb

// md5 hash:  df913c77e140da12ed609017b1c4df4c

const APIURL =
  "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42";

  // https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=iron&apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42&ts=1


const searchBox = document.getElementById("myInput");
const searchResultsContainer = document.getElementById('search-results-container');

loadEventListeners();
function loadEventListeners() {
  
  searchBox.addEventListener('keyup', handleSearch);
  
}


async function handleEnter(name) {
  // when a user clicks enter in the search bar
  var url2=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42&ts=1 `;
  let data = await fetchAsync(url2);
   
    // redirect to super hero page if success
    console.log(data);
    let path = `${data.data.results[0].urls[0].url}`;
    window.open(path);
  
}

// clear search results
async function clearResults() {
  let i = searchResultsContainer.childNodes.length;
  while (i--) {
    searchResultsContainer.removeChild(searchResultsContainer.lastChild);
  }
}

// retrieve a list of favourite hero id's from local storage
function getFavs() {
  let favs;
  // let arr=["1","2"];
  //   localStorage.setItem('favHeros', JSON.stringify(arr));


  if (localStorage.getItem("favHeros") === null) {
    favs = [];
  } else {
    
    favs = JSON.parse(localStorage.getItem("favHeros"));
  }
  return favs;
}




// fetch results from API
async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    document.write("No Hero With Entered Name Found");
    await clearResults();
  }
}


async function viewHeroPage(e){
  // let url3 =`https://gateway.marvel.com:443/v1/public/characters/${e.target.parentElement.id}?apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42&ts=1`;

  


  // let data = await fetchAsync(url3);

  // window.open(data.data.results[0].urls[0].url);
  let id=e.target.parentElement.id;
  let path = `${window.location.pathname} + /../showDetails.html#id=${e.target.parentElement.id}`;

  window.open(path);
}



// add a hero to favourites
async function addToFavourites(e){
  let id = e.target.parentElement.id;
  
  let favs = getFavs();
  if(!favs.includes(id)){
    favs.push(id);
  }
  localStorage.setItem('favHeros', JSON.stringify(favs));
  e.target.innerHTML = 'Remove from favourites';
  e.target.removeEventListener('click', addToFavourites);
  e.target.addEventListener('click', removeFromFavourites);
}


// remove a hero from favourites
async function removeFromFavourites(e){
  let id = e.target.parentElement.id;
  let favs = getFavs();

  let updatedFavs = favs.filter(function(val){
    return val != id;
  })
  localStorage.setItem('favHeros', JSON.stringify(updatedFavs));
  e.target.innerHTML = 'Add to favourites';
  e.target.removeEventListener('click', removeFromFavourites);
  e.target.addEventListener('click', addToFavourites);
}



async function handleSearch(e) {
  //  handle search
  let name = e.target.value.trim(); 
  //    trim the query name
  var urls=`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=123aac12be0dba2ca5cfe0d5da55aefb&hash=b4d2f00d99a9484379299aa6788a6f42&ts=1`;

  if (e.keyCode === 13 && name.length > 0) {
    // check if user has hit enter in the search bar
    handleEnter(name);
  }
  if (name.length == 0) {
    await clearResults();
  } else {
    // fetch results
    let data = await fetchAsync(urls);
      
      searchResultsContainer.innerHTML = "";
      let favs = getFavs();
      // create a list of elements for search results and add event listeners
      for (let i = 0; i < data.data.results.length; i++) {
        let item = document.createElement("div");
        item.className = "search-item";
        item.setAttribute("id", `${data.data.results[i].id}`);

        let label = document.createElement("div");
        label.innerHTML = data.data.results[i].name;
        label.addEventListener("click", viewHeroPage);
        item.appendChild(label);

        let option = document.createElement("div");
        if (favs.includes(data.data.results[i].id)) {
          option.innerHTML = "Remove from favourites";
          option.addEventListener("click", removeFromFavourites);
        } else {
          option.innerHTML = "Add to favourites";
          option.addEventListener("click", addToFavourites);
        }
        item.appendChild(option);

        searchResultsContainer.appendChild(item);
      }
    
  }
}
