// write your code here

// ! See all ramen images in the div with the id of ramen-menu.
// When the page loads,
// request the data from the server to get all the ramen objects.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

// ! GLOBAL VARIABLES
const RAMEN_URL = "http://localhost:3000/ramens/";
const menu = document.querySelector("#ramen-menu");
// const form = document.getElementById("new-ramen");

// ! COMMUNICATION WITH THE SERVER
const fetchAllRamens = () => {
  fetch(RAMEN_URL)
    .then((response) => response.json())
    .then((ramensArray) => {
      console.log(ramensArray);
      ramensArray.forEach((ramenObj) => {
        renderRamenPicture(ramenObj);
      });
    });
};

// ! RENDERING FUNCTIONS
const renderRamenPicture = (ramenObj) => {
  const img = document.createElement("img");
  img.src = ramenObj.image;
  img.alt = ramenObj.name;

  img.addEventListener("click", (e) => {
    // console.log(e.target)
    console.log(ramenObj);
    const detailImage = document.querySelector(".detail-image");
    const detailName = document.querySelector(".name");
    const detailRest = document.querySelector(".restaurant");
    const detailRating = document.querySelector("#rating-display");
    const detailComment = document.querySelector("#comment-display");

    detailImage.src = ramenObj.image;
    detailImage.alt = ramenObj.name;
    detailName.textContent = ramenObj.name;
    detailRest.textContent = ramenObj.restaurant;
    detailRating.textContent = ramenObj.rating;
    detailComment.textContent = ramenObj.comment;
  });
  menu.append(img);
};

// ! PAGE LOAD FUNCTIONS
const init = () => {
  fetchAllRamens();
  document.getElementById("new-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    // debugger;
    const newRamenObj = {
      name: e.target.querySelector("#new-name").value,
      restaurant: e.target.restaurant.value,
      image: e.target[2].value,
      rating: document.getElementById("new-rating").value,
      comment: e.target["new-comment"].value,
    };
    renderRamenPicture(newRamenObj);
  });
};
init();

// ? init function is optional
// fetchAllRamens()
// someotherFunc()
// otherfFunc()
// somethingElse()
