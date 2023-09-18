// HTML References
const breedSel = document.querySelector(".breeds");
const breedName = document.querySelector(".breed-name");
const dogImage = document.querySelector(".dog-image");
const loader = document.querySelector(".loader");

const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";

let breeds = [];

// pass in the name of the dog and return a url request string
function getDog(dog) {
  breedName.innerText = dog;
  return `https://dog.ceo/api/breed/${dog}/images/random`;
}

async function init() {
  await getBreeds();
  createBreedOptions();
  // Get random dog on page load
  const randIndex = Math.floor(Math.random() * breeds.length);
  const randDog = breeds[randIndex];
  breedSel.selectedIndex = randIndex;
  const randDogImgUrl = getDog(randDog);
  await getImage(randDogImgUrl);
}

async function getBreeds() {
  const res = await fetch(BREEDS_URL);
  const resJson = await res.json();
  breeds = Object.keys(resJson.message);
}

function createBreedOptions() {
  breeds.forEach((breed) => {
    const opt = document.createElement("option");
    opt.value, (opt.innerText = breed);
    breedSel.appendChild(opt);
  });
}

breedSel.addEventListener("change", async (event) => {
  loader.classList.add("show");
  dogImage.classList.remove("show");
  console.log(event.target.value);
  const reqUrl = getDog(event.target.value);
  await getImage(reqUrl);
});

async function getImage(url) {
  const req = await fetch(url);
  const reqJson = await req.json();
  dogImage.src = reqJson.message;
  dogImage.classList.add("show");
  loader.classList.remove("show");
}

init();
