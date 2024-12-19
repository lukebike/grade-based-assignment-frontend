// ****** Cocktail Name and Picture ******

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
const cocktailName = document.querySelector("#cocktail-name");
const detailName = document.querySelector("#detail-name");
const cocktailPicture = document.querySelector("#cocktail-picture");
const detailPicture = document.querySelector("#detail-picture");
const favoriteDetails = document.querySelector("#favorites-list");
const cocktailFilters = document.querySelector("#filters");

// ****** Cocktail Details ******
const detailCategory = document.querySelector("#detail-category");
const cocktailTags = document.querySelector("#cocktail-tags");
const cocktailInstructions = document.querySelector("#cocktail-instructions");
const cocktailIngredients = document.querySelector("#cocktail-ingredients");
const cocktailServing = document.querySelector("#cocktail-serving");

// ****** Buttons ******
const randomizerButton = document.querySelector("#randomizer");
const detailsButton = document.querySelector("#detail-button");
const startButton = document.querySelector("#start-link");
const favoritesButton = document.querySelector("#favorites-link");
const searchNameButton = document.querySelector("search-name");
const searchCategoryButton = document.querySelector("search-category");
const searchIngredientButton = document.querySelector("search-ingredient");
const searchGlassButton = document.querySelector("search-glass");
const searchButton = document.querySelector("#search-button");

// ****** Navigation ******
const navbar = document.querySelector("#navbar");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#detail-page");
const searchPage = document.querySelector("#search-page");
const favoritesPage = document.querySelector("#favorites-page");
const searchResult = document.querySelector("#search-result");
const cocktailSearch = document.querySelector("#cocktail-search");

// ****** Empty Object to Store API data locally ******
let cocktailData = {};
let cocktailDetailsData = {};
let favoritesList = [];
let cocktailFiltersClass = "";

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
getRandomCocktail();

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

function handleOnLinkClick(id) {
  if (id === "start-link") {
    startPage.classList.add("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
    favoritesPage.classList.remove("open");
  }

  if (id === "search-link") {
    searchPage.classList.add("open");
    startPage.classList.remove("open");
    detailsPage.classList.remove("open");
    favoritesPage.classList.remove("open");
  }

  if (id === "favorites-link") {
    favoritesPage.classList.add("open");
    startPage.classList.remove("open");
    detailsPage.classList.remove("open");
    searchPage.classList.remove("open");
  }
}

function favoritesListFunc() {
  for (let i = 1; i < favoritesList.length; i++) {
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    newImg.src = favoritesList[i].drinks[0].strDrinkThumb;
    newLi.textContent = favoritesList[i].drinks[0].strDrink;
    favoriteDetails.append(newLi, newImg);
  }
}

navbar.addEventListener("click", handleOnNavBarClick);
function handleOnNavBarClick(event) {
  const classList = event.target.classList;
  if (classList.contains("link")) return handleOnLinkClick(event.target.id);
}

randomizerButton.addEventListener("click", () => {
  cocktailIngredients.innerText = "";
  getRandomCocktail();
  handleOnLinkClick("start-link");
});

startButton.addEventListener("click", () => {
  getRandomCocktail();
  handleOnLinkClick("start-link");
});

detailsButton.addEventListener("click", () => {
  detailsPage.classList.add("open");
  startPage.classList.remove("open");
  searchResult.classList.remove("open");
});

searchButton.addEventListener("click", () => {
  searchResult.innerHTML = "";
  searchFilters();
  searchResult.classList.add("open");
});

searchResult.addEventListener("click", function (e) {
  cocktailIngredients.innerText = "";
  const drinkId = e.target.dataset.id;
  cocktailData.drinks[0].idDrink = drinkId;
  getDetailsCocktail();
  if (e.target.classList.contains("favorite-button")) {
    favoritesList.push(cocktailDetailsData);
    favoritesListFunc();
  }
  console.log(favoritesList);
  detailsPage.classList.add("open");
  startPage.classList.remove("open");
  searchPage.classList.remove("open");
});

favoritesButton.addEventListener("click", () => {
  favoritesListFunc();
});

cocktailFilters.addEventListener("click", function (e) {
  if (e.target.classList.value === "search-name") {
    cocktailFiltersClass = "search-name";
    cocktailSearch.value = "";
    cocktailSearch.placeholder = "Enter Cocktail Name";
    console.log(cocktailSearch);
  } else if (e.target.classList.value === "search-category") {
    cocktailFiltersClass = "search-category";
    cocktailSearch.value = "";
    cocktailSearch.placeholder = "Enter Cocktail Category";
  } else if (e.target.classList.value === "search-ingredient") {
    cocktailFiltersClass = "search-ingredient";
    cocktailSearch.value = "";
    cocktailSearch.placeholder = "Enter Cocktail Ingredient";
  } else if (e.target.classList.value === "search-glass") {
    cocktailFiltersClass = "search-glass";
    cocktailSearch.value = "";
    cocktailSearch.placeholder = "Enter Cocktail Glass Type";
  }
});

async function searchFilters() {
  const cocktailSearch = document.querySelector("#cocktail-search").value;
  let data = {};
  if (cocktailSearch !== "") {
    try {
      if (cocktailFiltersClass === "search-name") {
        const response = await fetch(
          `${baseURL}/search.php?s=${cocktailSearch}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch name data");
        }
        data = await response.json();
      } else if (cocktailFiltersClass === "search-category") {
        console.log("HELLO!");
        const response = await fetch(
          `${baseURL}/filter.php?c=${cocktailSearch}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch category data");
        }
        data = await response.json();
      } else if (cocktailFiltersClass === "search-ingredient") {
        const response = await fetch(
          `${baseURL}/filter.php?i=${cocktailSearch}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch ingredient data");
        }
        data = await response.json();
      } else {
        const response = await fetch(
          `${baseURL}/filter.php?g=${cocktailSearch}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch glass data");
        }
        data = await response.json();
      }
      if (data.drinks === "no data found") {
        window.alert("Invalid category, try again!");
      } else {
        for (let i = 0; i < data.drinks.length; i++) {
          const newResult = document.createElement("li");
          const newFavorite = document.createElement("span");
          newResult.textContent = data.drinks[i].strDrink;
          newFavorite.textContent = "Add to Favorites!";
          newFavorite.classList.add("favorite-button");
          newFavorite.dataset.id = data.drinks[i].idDrink;
          newResult.dataset.id = data.drinks[i].idDrink;
          searchResult.append(newResult, newFavorite);
        }
      }
    } catch (error) {
      console.log(error);
      console.log(data);
      console.log(`${baseURL}/filter.php?c=${cocktailSearch}`);
    }

    console.log(cocktailFiltersClass);
  } else {
    window.alert("Search can't be empty!");
  }
}
