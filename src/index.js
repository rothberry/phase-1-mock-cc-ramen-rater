// write your code here

const BASE_URL = "http://localhost:3000/ramens/";
// If we need to go to ramens/:id => BASE_URL + id

// ! GLOBAL DOM ELEMENTS
const ramenMenu = document.querySelector("#ramen-menu");
const ramenForm = document.getElementById("new-ramen");

// When the page loads, request the data from the server to get AN ARRAY of the ramen objects.
// See all ramen images in the div with the id of ramen-menu.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.
const fetchAllRamens = () => {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((ramen) => {
        createRamenImg(ramen);
        // let imgTag = document.createElement("img");
        // imgTag.src = ramen.image;
        // imgTag.alt = ramen.name;
        // imgTag.id = ramen.id;
        // ramenMenu.append(imgTag);
      });
    });
};

const fetchOneRamen = (id) => {
  fetch(BASE_URL + id)
    .then((res) => res.json())
    .then((oneRamen) => {
      console.log(oneRamen);
      displayDetail(oneRamen);
    });
};

const createRamenImg = (ramen) => {
  let imgTag = document.createElement("img");
  imgTag.src = ramen.image;
  imgTag.alt = ramen.name;
  imgTag.id = ramen.id;

  imgTag.addEventListener("click", (event) => {
    displayDetail(ramen);
  });
  // ! ALTERNATIVE EVENT HANDLER
  // imgTag.addEventListener("click", (event) => imgEventHandler(ramen));
  ramenMenu.append(imgTag);
};

const displayDetail = (oneRamen) => {
  let detailImg = document.querySelector(".detail-image");
  detailImg.src = oneRamen.image;
  detailImg.alt = oneRamen.name;

  document.querySelector(".name").textContent = oneRamen.name;
  document.querySelector(".restaurant").textContent = oneRamen.restaurant;
  document.querySelector("#rating-display").textContent = oneRamen.rating;
  document.querySelector("#comment-display").textContent = oneRamen.comment;
};

// Click on an image from the #ramen-menu div
// see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
const menuEventHandler = (event) => {
  if (event.target.id !== "ramen-menu") {
    // utilize the img.id to fetch one ramen and popluate the details
    fetchOneRamen(event.target.id);
  }
};

const handleNewRamen = (event) => {
  event.preventDefault();
  console.log(event);
  // ! FIRST
  let ramenObj = {
    name: ramenForm[0].value,
    restaurant: ramenForm[1].value,
    image: ramenForm[2].value,
    rating: ramenForm[3].value,
    comment: ramenForm[4].value,
  };
  console.log(ramenObj);
  createRamenImg(ramenObj);
};

const imgEventHandler = (ramen) => {
  displayDetail(ramen);
};

const init = () => {
  // This is where we put the page load functions
  fetchAllRamens();
  // ramenMenu.addEventListener("click", menuEventHandler);
  ramenForm.addEventListener("submit", handleNewRamen);
};

init();
