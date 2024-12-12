// ****** Cocktail Name and Picture ******
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
const cocktailName = document.querySelector("#cocktail-name");
const detailName = document.querySelector("#detail-name");
const cocktailPicture = document.querySelector("#cocktail-picture");
const detailPicture = document.querySelector("#detail-picture");

// ****** Cocktail Details ******
const detailCategory = document.querySelector("#detail-category");
const cocktailTags = document.querySelector("#cocktail-tags");
const cocktailInstructions = document.querySelector("#cocktail-instructions");
const cocktailIngredients = document.querySelector("#cocktail-ingredients");
const cocktailServing = document.querySelector("#cocktail-serving");

// ****** Buttons ******
const randomizerButton = document.querySelector("#randomizer");
const detailsButton = document.querySelector("#detail-button");
const searchButton = document.querySelector("#search-button");

// ****** Navigation ******
const navbar = document.querySelector(".navbar");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#detail-page");
const searchPage = document.querySelector("#search-page");
const searchResult = document.querySelector("#search-result");

// ****** Empty Object to Store API data locally ******
let cocktailData = {};
let cocktailDetailsData = {};

// ****** Call to Random Cocktail API ******
async function getRandomCocktail() {
  try {
    // ****** Random API ******

    const response = await fetch(`${baseURL}/random.php`);
    if (!response.ok) {
      throw new Error("Could not fetch random data");
    }
    const data = await response.json();
    cocktailData = data;

    cocktail(cocktailData);
  } catch (error) {
    console.error(error);
  }
}

// ****** Call to Details Cocktail API ******
async function getDetailsCocktail() {
  const detailsResponse = await fetch(
    `${baseURL}/lookup.php?i=${cocktailData.drinks[0].idDrink}`
  );
  if (!detailsResponse.ok) {
    throw new Error("Could not fetch details data");
  }
  const detailsData = await detailsResponse.json();
  cocktailDetailsData = detailsData;
  cocktail(cocktailDetailsData);
}

// ****** Call to Lookup Cocktail API ******
async function getSearchCocktail() {
  searchResult.innerHTML = "";
  const cocktailSearch = document.querySelector("#cocktail-search").value;
  try {
    const response = await fetch(`${baseURL}/search.php?s=${cocktailSearch}`);
    if (!response.ok) {
      throw new Error("Could not find cocktail");
    }
    console.log(response);
    const data = await response.json();
    console.log(data);
    for (let i = 0; i < data.drinks.length; i++) {
      const newResult = document.createElement("li");
      newResult.textContent = data.drinks[i].strDrink;
      newResult.dataset.id = data.drinks[i].idDrink;
      searchResult.appendChild(newResult);
    }
  } catch (error) {
    console.log(error);
  }
}

// ****** FUNCTIONS ******

function cocktail(cocktailData) {
  cocktailName.innerHTML = cocktailData.drinks[0].strDrink;
  cocktailPicture.src = cocktailData.drinks[0].strDrinkThumb;
  detailPicture.src = cocktailData.drinks[0].strDrinkThumb;
  detailName.innerText = `Cocktail Name: ${cocktailData.drinks[0].strDrink}`;
  detailCategory.innerText = `Category: ${cocktailData.drinks[0].strCategory}`;
  if (cocktailData.drinks[0].strTags !== null) {
    cocktailTags.innerText = `Tags: ${cocktailData.drinks[0].strTags}`;
  }
  cocktailTags.innerText = `Tags: None`;
  cocktailInstructions.innerText = cocktailData.drinks[0].strInstructions;
  cocktailServing.innerHTML = `Should be served in: ${cocktailData.drinks[0].strGlass}`;
  for (let i = 1; i <= 15; i++) {
    const ingredientNum = `strIngredient${i}`;
    const ingredients = cocktailData.drinks[0][ingredientNum];
    if (ingredients) {
      const newLi = document.createElement("li");
      newLi.textContent = cocktailData.drinks[0][ingredientNum];
      cocktailIngredients.appendChild(newLi);
    }
  }
}

navbar.addEventListener("click", handleOnNavBarClick);
function handleOnNavBarClick(event) {
  const classList = event.target.classList;
  if (classList.contains("link")) return handleOnLinkClick(event.target.id);
}

function handleOnLinkClick(id) {
  if (id === "start-link") {
    startPage.classList.add("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
  }

  if (id === "search-link") {
    startPage.classList.remove("open");
    detailsPage.classList.remove("open");
    searchPage.classList.add("open");
  }
}

randomizerButton.addEventListener("click", () => {
  cocktailIngredients.innerText = "";
  getRandomCocktail();
});
startPage.addEventListener("click", () => {
  getRandomCocktail();
  console.log(cocktailData);
});

detailsButton.addEventListener("click", () => {
  detailsPage.classList.add("open");
  startPage.classList.remove("open");
});

searchButton.addEventListener("click", () => {
  getSearchCocktail();
});

searchResult.addEventListener("click", function (e) {
  cocktailIngredients.innerText = "";
  const drinkId = e.target.dataset.id;
  cocktailData.drinks[0].idDrink = drinkId;
  getDetailsCocktail();
});
