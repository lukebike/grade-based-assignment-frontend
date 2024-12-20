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
const startLink = document.querySelector("#start-link");
const backtoStart = document.querySelector("#backToStartLink");
const favoritesLink = document.querySelector("#favorites-link");
const favoriteButton = document.querySelector("#favorite-button");
const addToFavoriteButton = document.querySelector("#addToFavorites");
const searchLink = document.querySelector("#search-link");
const searchNameButton = document.querySelector("search-name");
const searchCategoryButton = document.querySelector("search-category");
const searchIngredientButton = document.querySelector("search-ingredient");
const searchGlassButton = document.querySelector("search-glass");
const searchButton = document.querySelector("#search-button");

// ****** Navigation ******
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#detail-page");
const searchPage = document.querySelector("#search-page");
const favoritesPage = document.querySelector("#favorites-page");
const searchResult = document.querySelector("#search-result");
const cocktailSearch = document.querySelector("#cocktail-search");

// ****** Constants ****** 
const FAVORITES_KEY = "favorites";

// ****** Empty Object to Store API data locally ******
let cocktailData = {};
let cocktailDetailsData = {};
let cocktailFiltersClass = "";
let selectedCocktail = null;
let searchResults = [];
let ItemsPerPage = 10;
let currentPage = 1;

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
loadFavorites();

// ****** Call to Details Cocktail API ******
async function getDetailsCocktail() {
  if (selectedCocktail == null) {
    throw new Error("No selected cocktail");
  };

  const detailsResponse = await fetch(
    `${baseURL}/lookup.php?i=${selectedCocktail}`
  );
  if (!detailsResponse.ok) {
    throw new Error("Could not fetch details data");
  }
  const detailsData = await detailsResponse.json();
  cocktailDetailsData = detailsData;
  cocktail(cocktailDetailsData);
}

async function GetCocktailById(id) {
  if (id === "" || id === null) return;

  const detailsResponse = await fetch(
    `${baseURL}/lookup.php?i=${id}`
  );

  return detailsResponse.json();
}

// ****** FUNCTIONS ******
function cocktail(cocktailData) {
  cocktailName.innerHTML = cocktailData.drinks[0].strDrink;
  cocktailPicture.src = cocktailData.drinks[0].strDrinkThumb;
  detailPicture.src = cocktailData.drinks[0].strDrinkThumb;
  detailName.innerText = `${cocktailData.drinks[0].strDrink}`;
  detailCategory.innerText = `${cocktailData.drinks[0].strCategory}`;
  if (cocktailData.drinks[0].strTags !== null) {
    const tags = cocktailData.drinks[0].strTags.split(",");
    cocktailTags.innerHTML = "";
    tags.forEach(item => {
      cocktailTags.innerHTML += `<span class="tag is-dark mr-1">${item}</span>`;
    });
  } else {
    cocktailTags.innerText = `None`;
  }
  cocktailInstructions.innerText = cocktailData.drinks[0].strInstructions;
  cocktailServing.innerHTML = `${cocktailData.drinks[0].strGlass}`;
  for (let i = 1; i <= 15; i++) {
    const ingredientNum = `strIngredient${i}`;
    const ingredients = cocktailData.drinks[0][ingredientNum];
    if (ingredients) {
      const newLi = document.createElement("li");
      newLi.innerHTML = `<i class="fa fa-circle mr-1 is-size-7" aria-hidden="true"></i>${cocktailData.drinks[0][ingredientNum]}`;
      cocktailIngredients.appendChild(newLi);
    }
  }

  if (isDrinkInFavorites(cocktailData.drinks[0].idDrink)) {
    favoriteButton.innerHTML = `<i class="fa fa-star mr-2"></i> Remove from favorites`;
    addToFavoriteButton.innerHTML = `<i class="fa fa-star mr-2"></i> Remove from favorites`;
  } else {
    favoriteButton.innerHTML = `<i class="fa fa-star mr-2"></i> Add to favorites`;
    addToFavoriteButton.innerHTML = `<i class="fa fa-star mr-2"></i> Add to favorites`;
  }
  favoriteButton.dataset.id = cocktailData.drinks[0].idDrink;
  addToFavoriteButton.dataset.id = cocktailData.drinks[0].idDrink;
}

function handleOnLinkClick(id) {
  if (id === startLink.id || id === backtoStart.id) {
    document.querySelector(".open").classList.remove("open");
    startPage.classList.add("open");
  }

  if (id === searchLink.id) {
    document.querySelector(".open").classList.remove("open");
    searchPage.classList.add("open");
  }

  if (id === favoritesLink.id) {
    document.querySelector(".open").classList.remove("open");
    favoritesPage.classList.add("open");
  }
}

randomizerButton.addEventListener("click", () => {
  const originalHtml = randomizerButton.innerHTML;
  cocktailIngredients.innerText = "";
  randomizerButton.disabled = true;
  randomizerButton.innerHTML = `<i class="fa fa-spinner fa-spin fa-fw mr-1"></i> Loading...`;
  getRandomCocktail()
    .then(() => {
      setTimeout(() => {
        randomizerButton.disabled = false;
        randomizerButton.innerHTML = originalHtml;
        handleOnLinkClick(startLink.id);
      }, 250);
    });
});

startLink.addEventListener("click", (e) => {
  getRandomCocktail();
  handleOnLinkClick(e.target.id);
});

backtoStart.addEventListener("click", (e) => {
  handleOnLinkClick(e.target.id);
});

searchLink.addEventListener("click", (e) => {
  handleOnLinkClick(e.target.id);
});

detailsButton.addEventListener("click", () => {
  document.querySelector(".open").classList.remove("open");
  detailsPage.classList.add("open");
});

searchButton.addEventListener("click", () => {
  searchResult.innerHTML = "";
  searchButton.disabled = true;
  searchButton.classList.add("is-loading");
  searchFilters().then(() => {
    setTimeout(() => {
      searchResult.classList.add("open");
      searchButton.disabled = false;
      searchButton.classList.remove("is-loading");
    }, 250);
  });
});


[favoriteButton, addToFavoriteButton].forEach(favBtn => {
  favBtn.addEventListener("click", () => {
    handleFavoriteButtonClick(favBtn);
    const drinkId = favBtn.dataset.id;
    if (isDrinkInFavorites(drinkId)) {
      favBtn.innerHTML = `<i class="fa fa-star mr-2"></i> Remove from favorites`
    } else {
      favBtn.innerHTML = `<i class="fa fa-star mr-2"></i> Add to favorites`
    }
  });
});

favoritesLink.addEventListener("click", () => {
  loadFavorites();
  handleOnLinkClick(favoritesLink.id);
});

async function searchFilters() {
  const searchQuery = document.querySelector("#cocktail-search").value;
  const searchFilter = document.querySelector("#search-filters").value;
  let data = {};
  if (searchQuery !== "") {
    try {
      if (searchFilter === "Name") {
        const response = await fetch(
          `${baseURL}/search.php?s=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch name data");
        }
        data = await response.json();
      } else if (searchFilter === "Category") {
        const response = await fetch(
          `${baseURL}/filter.php?c=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch category data");
        }
        data = await response.json();
      } else if (searchFilter === "Ingredient") {
        const response = await fetch(
          `${baseURL}/filter.php?i=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch ingredient data");
        }
        data = await response.json();
      } else {
        const response = await fetch(
          `${baseURL}/filter.php?g=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch glass data");
        }
        data = await response.json();
      }
      if (data.drinks === "no data found" || data.drinks === null) {
        searchResults = [];
        document.querySelectorAll(".divider").forEach(divider => divider.classList.add("is-hidden"));
        handlePagination();
        window.alert("Did not find any data matching the selected search filter");
      } else {
        searchResults = data.drinks;
        document.querySelectorAll(".divider.is-hidden").forEach(divider => divider.classList.remove("is-hidden"));
        handlePagination();
      }
    } catch (error) {
      console.log(error);
    }
  }
}

function handlePagination() {
  const paginationList = document.querySelector(".pagination-list");
  if (searchResults.length > 0) {
    let numberOfPages = Math.ceil(searchResults.length / ItemsPerPage);
    paginationList.innerHTML = "";
    for (let i = 0; i < numberOfPages; i++) {
      paginationList.insertAdjacentHTML("beforeend", `<li><a href="#" onclick="goToPage(${i + 1})" data-page="${i + 1}" class="pagination-link ${i + 1 === currentPage ? "is-current" : ""}" aria-label="Goto page ${i + 1}">${i + 1}</a></li>`);
    }
    goToPage(currentPage);
  } else {
    paginationList.innerHTML = "";
  }
}

function goToPage(pageNum) {
  let currentPage = pageNum;
  let startIndex = (currentPage - 1) * ItemsPerPage;
  let endIndex = startIndex + ItemsPerPage;
  let drinks = searchResults.slice(startIndex, endIndex);
  searchResult.innerHTML = "";
  for (let i = 0; i < drinks.length; i++) {
    searchResult.insertAdjacentHTML("beforeend", `
        <div data-id="${drinks[i].idDrink}" class="result-row is-flex mb-2" style="width: 100%" ">
          <img class="image mr-2 rounded-border" src="${drinks[i].strDrinkThumb}" style="width: 50px; height: 50px" />
          <div class="is-flex is-flex-direction-column">
            <p class="has-text-weight-medium">${drinks[i].strDrink}</p>
            <p>${drinks[i].strCategory ?? "Unspecified Category"}</p>
          </div>
          <button type="button" onclick="viewCocktailDetails(${drinks[i].idDrink})" class="button is-small ml-auto mr-1 is-info is-outlined"><i class="fa fa-info fa-fw"></i></button>
          <button type="button" onclick="handleFavoriteButtonClick(this)" data-id="${drinks[i].idDrink}" class="button is-small is-warning ${isDrinkInFavorites(drinks[i].idDrink) ? "" : "is-outlined"}"><i class="fa fa-star-o fa-fw"></i></button>
        </div>
      `);
  }
  // remove class from old page
  document.querySelector(".is-current").classList.remove("is-current");
  // add class to new page
  document.querySelector(`a[data-page='${currentPage}']`).classList.add("is-current");
}

function handleFavoriteButtonClick(element) {
  const drinkId = element.dataset.id;
  let favorites = localStorage.getItem(FAVORITES_KEY);
  if (favorites !== null) {
    // parse the favorites string back to array
    let drinksArray = JSON.parse(favorites);
    // check if the drink exists in the array
    const drinkIndex = drinksArray.indexOf(drinkId);
    if (drinkIndex === -1) {
      drinksArray.push(drinkId);
      // save the updated array back to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(drinksArray));
      // update the button styling to reflect the change
      element.classList.remove("is-outlined");
    } else {
      drinksArray.splice(drinkIndex, 1);
      // save the updated array back to localStorage
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(drinksArray));
      // update the button styling to reflect the change
      element.classList.add("is-outlined");
    }
  } else {
    // create a new favorites array
    let drinksArray = [drinkId];
    // save the array to localStorage
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(drinksArray));
    // update the button styling to reflect the change
    element.classList.remove("is-outlined");
  }
}

function isDrinkInFavorites(id) {
  if (localStorage.getItem(FAVORITES_KEY) != null) {
    let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY));
    return favorites.indexOf(id) > -1;
  }
  return false;
}

function viewCocktailDetails(id) {
  selectedCocktail = id;
  getDetailsCocktail().then(() => {
    document.querySelector(".open").classList.remove("open");
    detailsPage.classList.add("open");
  });
}

function loadFavorites() {
  let favoritesList = document.querySelector("#favorites-list");
  let favorites = localStorage.getItem(FAVORITES_KEY);
  if (favorites != null) {
    favoritesList.innerHTML = "";
    let drinksIds = JSON.parse(favorites);
    drinksIds.forEach(id => {
      GetCocktailById(id)
        .then((data) => {
          favoritesList.insertAdjacentHTML("beforeend", `
            <div class="box is-flex mb-3">
              <img class="mr-2" src="${data.drinks[0].strDrinkThumb}" style="width: 100px; height: 100px" />
              <div class="is-flex is-flex-direction-column ">
                <p class="is-size-5 has-text-weight-medium">${data.drinks[0].strDrink}</p>
                <p class="has-text-black">${data.drinks[0].strCategory}</p>
                <div class="is-flex mt-2">
                <button type="button" onclick="viewCocktailDetails(${data.drinks[0].idDrink})" class="button is-info is-outlined mr-1"><i class="fa fa-info fa-fw"></i></button>
                <button type="button" onclick="handleFavoriteButtonClick(this)" data-id="${data.drinks[0].idDrink}" class="button is-warning ${isDrinkInFavorites(data.drinks[0].idDrink) ? "" : "is-outlined"}"><i class="fa fa-star-o fa-fw"></i></button>
                </div>
              </div>
            </div>
          `);
        });
    });
  }
  else {
    favoritesList.innerHTML = "No favorites";
  }
}