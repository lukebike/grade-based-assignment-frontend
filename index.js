const cocktailName = document.querySelector("#cocktailName");
const detailName = document.querySelector("#detailName");
const cocktailImage = document.querySelector("#cocktailPicture");

const detailCategory = document.querySelector("#detailCategory");
const cocktailTags = document.querySelector("#cocktailTags");

const cocktailInstructions = document.querySelector("#cocktailInstructions");
const cocktailIngredients = document.querySelector("#cocktailIngredients");
const cocktailServing = document.querySelector("#cocktailServing");

const randomizerButton = document.querySelector("#randomizer");
const detailsButton = document.querySelector("#detailsButton");

const navbar = document.querySelector(".navbar");
const startPage = document.querySelector("#start-link");
const detailsPage = document.querySelector("#details-page");
const searchPage = document.querySelector("#search-page");

let cocktailData = {};

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
    cocktailName.innerHTML = data.drinks[0].strDrink;
    cocktailImage.src = data.drinks[0].strDrinkThumb;

    detailName.innerText = `Cocktail Name: ${data.drinks[0].strDrink}`;
    console.log(detailName);
    console.log(data);
  } catch (error) {
    console.error(error);
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
  getRandomCocktail();
  console.log(cocktailData);
});
startPage.addEventListener("click", () => {
  getRandomCocktail();
  console.log(cocktailData);
});
