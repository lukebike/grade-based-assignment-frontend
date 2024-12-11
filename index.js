// ****** Cocktail Name and Picture ******
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

// ****** Navigation ******
const navbar = document.querySelector(".navbar");
const startPage = document.querySelector("#start-page");
const detailsPage = document.querySelector("#detail-page");
const searchPage = document.querySelector("#search-page");

// ****** Empty Object to Store API data locally ******
let cocktailData = {};

// ***** Call to Cocktail API ******
async function getRandomCocktail() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const data = await response.json();
    cocktailData = data;
    cocktailName.innerHTML = cocktailData.drinks[0].strDrink;
    cocktailPicture.src = cocktailData.drinks[0].strDrinkThumb;
    detailPicture.src = cocktailData.drinks[0].strDrinkThumb;
    detailName.innerText = `Cocktail Name: ${cocktailData.drinks[0].strDrink}`;
    detailCategory.innerText = `Category: ${cocktailData.drinks[0].strCategory}`;
    cocktailTags.innerText = `Tags: ${cocktailData.drinks[0].strMeasure1}`;
    cocktailInstructions.innerText = cocktailData.drinks[0].strInstructions;
    // for (let i = 1; i <= 15; i++) {
    //   const ingredients = `${cocktailData.drinks[0].strIngredient}${i}`;
    //   if (ingredients) {
    //     console.log(ingredients);
    //   }
    // }
    cocktailServing.innerHTML = `Should be served in: ${cocktailData.drinks[0].strGlass}`;
  } catch (error) {
    console.error(error);
  }
}

// ****** FUNCTIONS ******
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
  getRandomCocktail();
  console.log(cocktailData);
});
startPage.addEventListener("click", () => {
  getRandomCocktail();
  console.log(cocktailData);
});

detailsButton.addEventListener("click", () => {
  detailsPage.classList.add("open");
  startPage.classList.remove("open");
});
