const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const BREED_TITLE = document.querySelector("h2");
const breedSel = document.querySelector(".breeds"); // Get ref to sel

// TODO: Handle loading image

// pass in the name of the dog and return a url request string
function getDogUrl(dog) {
  return `https://dog.ceo/api/breed/${dog}/images/random`;
}

// handle change
breedSel.addEventListener("change", async (event) => {
  const breed = event.target.value; // get sel updated value
  const reqUrl = getDogUrl(breed);
  await getDogImage(reqUrl); // request and set a dog image
  BREED_TITLE.innerText = breed; // Update Header
});

// run when page loads to populate sel
async function getBreeds() {
  const res = await fetch(BREEDS_URL); // await api response
  const resJson = await res.json(); // await convert to JSON

  const breeds = Object.keys(resJson.message); // get array of breeds
  breeds.forEach((breed) => {
    const option = document.createElement("option"); // create new sel option
    option.value, option.innerText = breed;
    breedSel.appendChild(option); // add option to sel
  });

  // get the first random dog and set name
  let randIndex = Math.floor(Math.random() * breeds.length);
  let randDog = breeds[randIndex];
  await getDogImage(getDogUrl(randDog));
  BREED_TITLE.innerText = randDog;
  breedSel.selectedIndex = randIndex;
}

// Pass in the url for a breed, get url for random pic of that breed
async function getDogImage(url) {
  const res = await fetch(url); // fetch res from url
  const resJson = await res.json(); // convert res to json
  setDogImage(resJson.message);
}

// Pass in the url for a specific dog pic, replace dog on page
function setDogImage(url) {
  // Create a new image element
  const img = document.createElement("img");
  img.src = url;
  img.alt = "Cute Doggo";
  img.className = "dog";
  document.querySelector(".dog").replaceWith(img);
}

// call getBreeds on page load
getBreeds();
