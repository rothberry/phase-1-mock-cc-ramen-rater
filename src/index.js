// write your code here
// ! GLOBAL CONSTANTS
const URL = "http://localhost:3000/ramens";

// ! GLOBAL DOM ELEMENTS
const menu = document.getElementById("ramen-menu");

// See all ramen images in the div with the id of ramen-menu.
// When the page loads, request the data from the server to get all the ramen objects.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

const getRamens = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        renderRamen(ramen);
      });
    });
};

const renderRamen = (ramenObj) => {
  const img = document.createElement("img");
  img.src = ramenObj.image;
  img.alt = ramenObj.name;

  img.addEventListener("click", (e) => {
    console.log(e.target, ramenObj);
    document.querySelector(".detail-image").src = ramenObj.image;
    document.querySelector(".name").textContent = ramenObj.name;
    document.querySelector(".restaurant").textContent = ramenObj.restaurant;
    document.querySelector("#rating-display").textContent = ramenObj.rating;
    document.querySelector("#comment-display").textContent = ramenObj.comment;
  });
  menu.append(img);
};

const handleSubmit = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const rest = e.target["restaurant"].value;
  const image = document.getElementById("new-image").value;
  const rating = e.target[3].value;
  const comment = e.target["new-comment"].value;

  const newRamenObj = {
    name: name,
    restaurant: rest,
    image: image,
    rating: rating,
    comment: comment,
  };
  console.log(newRamenObj);
  renderRamen(newRamenObj);
};

getRamens();

document.getElementById("new-ramen").addEventListener("submit", handleSubmit);
