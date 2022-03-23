// ! See all ramen images in the div with the id of ramen-menu.
// ! When the page loads, request the data from the server to get all the ramen objects.
// ! Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

// * GLOBAL VARIABLES
// all my elements at the root level, and any constants or dynamic variables we will need throughout the whole app
const ramenMenu = document.getElementById("ramen-menu");
const ramenDetail = document.getElementById("ramen-detail");
const ramenDetailImage = document.querySelector(".detail-image");
const ramenForm = document.getElementById("new-ramen");
const editRamenForm = document.getElementById("edit-ramen");
const deleteBtn = ramenDetail.querySelector(".delete-btn")
const URL = "http://localhost:3000/ramens/";

let allRamenArray = [];

const fetchAllRamen = () => {
  fetch(URL)
    .then((res) => res.json())
    .then((allRamens) => {
      // for each element of the allRamens array, we need to create an img tag with that data
      updateDisplayRamen(allRamens[0])
      allRamenArray = allRamens;
      allRamens.forEach((oneRamen) => {
        createOneImage(oneRamen);
      });
    });
};

// create a func to create ONE img tag with the correct data
const createOneImage = (oneRamen) => {
  const ramenImage = document.createElement("img");
  ramenImage.src = oneRamen.image;
  ramenImage.alt = oneRamen.name;
  ramenImage.id = oneRamen.id;
  ramenImage.addEventListener("click", handleRamenClick);
  ramenMenu.append(ramenImage);
};

// ! Click on an image from the #ramen-menu div
// ! see all the info about that ramen displayed inside the #ramen-detail div
// ! where it says insert comment here and insert rating here.

const handleRamenClick = (event) => {
  console.log(event.target.id);
  // find ramen with e.target.id
  const foundRamen = allRamenArray.find(
    (ramen) => ramen.id === Number(event.target.id)
  );
  console.log(foundRamen);
  // then set that obj to our details
  updateDisplayRamen(foundRamen);
};

const updateDisplayRamen = (detailRamen) => {
  ramenDetail.className = detailRamen.id
  deleteBtn.id = detailRamen.id
  ramenDetailImage.src = detailRamen.image;
  ramenDetailImage.alt = detailRamen.name;
  ramenDetail.querySelector(".name").innerText = detailRamen.name;
  ramenDetail.querySelector(".restaurant").innerHTML = detailRamen.restaurant;
  document.getElementById("rating-display").textContent = detailRamen.rating;
  document.getElementById("comment-display").textContent = detailRamen.comment;
};

// ! Create a new ramen after submitting the new-ramen form.
// ! The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

const addNewRamen = (event) => {
  event.preventDefault();
  // const testVar = "ajksfhsgf"
  const ramenObj = {
    id: allRamenArray.length + 1,
    name: document.getElementById("new-name").value,
    restaurant: document.getElementById("new-restaurant").value,
    image: document.getElementById("new-image").value,
    rating: document.getElementById("new-rating").value,
    comment: document.getElementById("new-comment").value,
  };
  allRamenArray.push(ramenObj);
  createOneImage(ramenObj);
  ramenForm.reset();
};


// ? See the details for the first ramen as soon as the page loads (without clicking on an image)

// ? Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist. You can add this HTML to the index.html file to create the edit form:
const updateCurrentRamen = e => {
    e.preventDefault()
    // document.getElementById("edit-rating").value
    // how to change one ramen while leaving the other the same??
    // foreach? map? filter? find?
    allRamenArray = allRamenArray.map(oneRamen => {
        // update ONLY if the current ramen is the oneRamen?
        if (oneRamen.id === parseInt(ramenDetail.className)) {
            oneRamen.rating = editRamenForm[0].value
            document.getElementById("rating-display").textContent = editRamenForm[0].value
            oneRamen.comment = editRamenForm[1].value
            document.getElementById("comment-display").textContent = editRamenForm[1].value

        }
        return oneRamen
    })
}

const handleDeleteRamen = event => {
    // console.log(ramenDetail.className)
    // console.log(event.target.id)
    // first remove the ramen with that id from our array
    // one way>>> if our array is sequencial
    // allRamenArray.splice(Number(event.target.id) - 1,1)
    // start with array of 5 things? .something => array of 4 things..
    allRamenArray = allRamenArray.filter(ramen => {
        return ramen.id !== parseInt(event.target.id)
    })
    // remove from img list
    // wipe the image list, and recreate
    ramenMenu.innerText = "<h1></h1>"
    // ramenMenu.innerHTML = "<h1></h1>"
    allRamenArray.forEach(oneRamen => {
        createOneImage(oneRamen)
    })
    // debugger
    // remove from detail
    updateDisplayRamen(allRamenArray[0])
}

// ? Delete a ramen (you can add a "delete" button if you'd like, or use an existing element to handle the delete action). The ramen should be removed from the ramen-menu div, and should not be displayed in the ramen-detail div. No need to persist.

const init = () => {
  // put all my runtime functions
  fetchAllRamen();
  ramenForm.addEventListener("submit", addNewRamen);
  editRamenForm.addEventListener("submit", updateCurrentRamen)
  deleteBtn.addEventListener("click", handleDeleteRamen)
};

init();

// document.addEventListener("DOMContentLoaded", init)
