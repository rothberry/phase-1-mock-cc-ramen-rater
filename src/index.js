// write your code here

// ! See all ramen images in the div with the id of ramen-menu.
// When the page loads,
// request the data from the server to get all the ramen objects.
// Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

// ! GLOBAL VARIABLES
const RAMEN_URL = "http://localhost:3000/ramens/";
const menu = document.querySelector("#ramen-menu");
// Can be global because rating/comment are modified in multiple functions
const detailRating = document.querySelector("#rating-display");
const detailComment = document.querySelector("#comment-display");
const deleteBtn = document.getElementById("delete");
// const form = document.getElementById("new-ramen");
// let allRamens = [];

// ! COMMUNICATION WITH THE SERVER
const fetchAllRamens = () => {
  fetch(RAMEN_URL)
    .then((response) => response.json())
    .then((ramensArray) => {
      allRamens = ramensArray;
      ramensArray.forEach((ramenObj) => {
        renderRamenPicture(ramenObj);
      });
      renderDetails(ramensArray[0]);
    });
};

// ! RENDERING FUNCTIONS
const renderRamenPicture = (ramenObj) => {
  const img = document.createElement("img");
  img.src = ramenObj.image;
  img.alt = ramenObj.name;
  img.id = `ramen-${ramenObj.id}`;

  img.addEventListener("click", (e) => {
    // console.log(e.target)
    renderDetails(ramenObj);
  });
  menu.append(img);
};

const renderDetails = (ramenObj) => {
  const detailImage = document.querySelector(".detail-image");
  const detailName = document.querySelector(".name");
  const detailRest = document.querySelector(".restaurant");

  detailImage.src = ramenObj.image;
  detailImage.alt = ramenObj.name;
  detailName.textContent = ramenObj.name;
  detailRest.textContent = ramenObj.restaurant;
  detailRating.textContent = ramenObj.rating;
  detailComment.textContent = ramenObj.comment;

  deleteBtn.addEventListener("click", (e) => {
    // console.log("DELETING");
    // console.log(ramenObj);
    // console.log(e.target);
    // remove the image
    detailImage.src = "./assets/image-placeholder.jpg";
    detailImage.alt = "Insert Name Here";
    detailName.textContent = "Insert Name Here";
    detailRest.textContent = "Insert Restaurant Here";
    detailRating.textContent = "Insert Raing Here";
    detailComment.textContent = "Insert Comment Here";
    // debugger;

    const imgToRemove = menu.querySelector(`#ramen-${ramenObj.id}`);
    if (imgToRemove) {
      imgToRemove.remove();
    }
  });
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

  document.getElementById("edit-ramen").addEventListener("submit", (e) => {
    e.preventDefault();
    const updatedRating = e.target.rating.value;
    const updatedComment = e.target["edit-comment"].value;
    // debugger;
    detailRating.textContent = updatedRating;
    detailComment.textContent = updatedComment;
    e.target.reset();
  });
};
init();
