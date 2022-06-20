const searchBar = document.getElementById("searchBar");

let beersPromises = [];
let searchBeer = "";

searchBar.addEventListener("keyup", (e) => {
  searchBeer = e.target.value.toLowerCase();
  Promise.resolve(beersPromises)
    .then(searchEngine)
    .then(generateHTML)
    .then(insertBeersIntoPage);
});

const searchEngine = (beers) => {
  return beers.filter((beer) => {
    return beer.name.toLowerCase().includes(searchBeer);
  });
};

const getBeers = () => {
  const beersURL = `https://api.punkapi.com/v2/beers`;
  beersPromises = fetch(beersURL).then((response) => response.json());
  Promise.resolve(beersPromises).then(generateHTML).then(insertBeersIntoPage);
};

const generateHTML = (beers) => {
  return beers.reduce((accumulator, beer) => {
    accumulator += `
    <li class="card">
      <img class="card-image" alt="${beer.name}" src="${beer.image_url}"/>
      <h2 class="card-title">${beer.name}</h2>
      <p class="card-subtitle">${beer.description}</p>
    </li>
  `;
    return accumulator;
  }, "");
};

const insertBeersIntoPage = (beers) => {
  const ul = document.querySelector('[data-js="punk"]');
  ul.innerHTML = beers;
  return beers;
};

getBeers();
