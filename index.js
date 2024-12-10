const cocktailName = document.querySelector("#cocktailName");
const cocktailImage = document.querySelector("#cocktailPicture");
const randomizerButton = document.querySelector("#randomizer");
const homePage = document.querySelector("#home");

async function getRandomCocktail() {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/random.php"
    );
    if (!response.ok) {
      throw new Error("Could not fetch data");
    }

    const data = await response.json();
    cocktailName.innerHTML = data.drinks[0].strDrink;
    cocktailImage.src = data.drinks[0].strDrinkThumb;
    console.log(cocktailImage.src);
    console.log(cocktailImage);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
randomizerButton.addEventListener("click", () => {
  getRandomCocktail();
});
homePage.addEventListener("click", () => {
  getRandomCocktail();
});
