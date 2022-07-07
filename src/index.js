// write your code here

const BASE_URL = "http://localhost:3000/ramens/";
// If we need to go to ramens/:id => BASE_URL + id

// ! GLOBAL DOM ELEMENTS
const ramenMenu = document.querySelector("#ramen-menu");
const ramenForm = document.getElementById("new-ramen");
const ramenEdit = document.getElementById("edit-ramen");

const fetchAllRamens = () => {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayDetail(data[0]);
      data.forEach((ramen) => {
        createRamenImg(ramen);
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
  let imgDiv = document.createElement("div");
  imgDiv.id = "img-" + ramen.id;
  let imgTag = document.createElement("img");
  imgTag.src = ramen.image;
  imgTag.alt = ramen.name;
  imgTag.id = ramen.id;

  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";

  imgTag.addEventListener("click", () => {
    displayDetail(ramen);
  });
  deleteBtn.addEventListener("click", (event) => {
    // go up one level to the whole div
    // remove the whole div
    // debugger;
    let nextId = Number(event.target.parentElement.id.split("-")[1]) + 1;
    event.target.parentElement.remove();

    fetchOneRamen(nextId);
    // displayDetail({
    //   name: "Insert Name",
    //   restaurant: "Insert Rest",
    //   image: "./assets/image-placeholder.jpg",
    //   rating: "Insert Rating",
    //   comment: "Insert Comment",
    // });
    // then if the current ramen is in the detail, remove and show another
  });
  imgDiv.append(deleteBtn, imgTag);
  ramenMenu.append(imgDiv);
};

const displayDetail = (oneRamen, isFullObj = true) => {
  // Basically if we are NOT updating
  if (isFullObj) {
    let detailImg = document.querySelector(".detail-image");
    detailImg.src = oneRamen.image;
    detailImg.alt = oneRamen.name;

    document.querySelector(".name").textContent = oneRamen.name;
    document.querySelector(".restaurant").textContent = oneRamen.restaurant;
  }
  document.querySelector("#rating-display").textContent = oneRamen.rating;
  document.querySelector("#comment-display").textContent = oneRamen.comment;
};

const menuEventHandler = (event) => {
  if (event.target.id !== "ramen-menu") {
    fetchOneRamen(event.target.id);
  }
};

const handleNewRamen = (event) => {
  event.preventDefault();
  let ramenObj = {
    name: ramenForm[0].value,
    restaurant: ramenForm[1].value,
    image: ramenForm[2].value,
    rating: ramenForm[3].value,
    comment: ramenForm[4].value,
  };

  let ramenObj2 = {};

  for (let i = 0; i < ramenForm.length - 1; i++) {
    ramenObj2[ramenForm[i].name] = ramenForm[i].value;
  }

  console.log(ramenObj2);
  createRamenImg(ramenObj2);
};

const handleEditRamen = (event) => {
  event.preventDefault();

  // * More static way
  // document.querySelector("#rating-display").textContent = ramenEdit[0].value
  // document.querySelector("#comment-display").textContent = ramenEdit.querySelector("#edit-comment").value

  // !ORRRR a more dynamic way

  let ramenObj = {
    rating: ramenEdit[0].value,
    comment: ramenEdit.querySelector("#edit-comment").value,
  };

  displayDetail(ramenObj, false);
};

const handleDelete = (event) => {
  debugger;
};

const init = () => {
  // This is where we put the page load functions
  fetchAllRamens();
  // ramenMenu.addEventListener("click", menuEventHandler);
  ramenEdit.addEventListener("submit", handleEditRamen);
  ramenForm.addEventListener("submit", handleNewRamen);
};

init();
