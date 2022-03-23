// ! FIRST

// # See all ramen images in the div with the id of ramen-menu. 
// # When the page loads, request the data from the server to get all the ramen objects. 
// # Then, display the image for each of the ramen using an img tag inside the #ramen-menu div.

// Find all elements we will need
const ramenMenu = document.getElementById("ramen-menu")
const ramenDetail = document.getElementById("ramen-detail")
const URL =  "http://localhost:3000/ramens/"

let ramens = []

// Create a function to FETCH all our ramen
const fetchAllRamen = () => {
    fetch(URL)
    .then(res => res.json())
    // .then(ramenData => ramens = ramenData)
    .then(ramenData => {
        ramenData.map(ramenObj => {
            // console.log(ramenObj)
            createRamenImage(ramenObj)
        })
    })
}

// Func to create ONE ramen image element
const createRamenImage = ramenObj => {
    const img = document.createElement("img")
    img.src = ramenObj.image
    img.alt = ramenObj.name
    img.id = ramenObj.id
    img.addEventListener("click", displayRamen)
    ramenMenu.append(img)
}


// # Click on an image from the #ramen-menu div 
// # see all the info about that ramen displayed inside the #ramen-detail div 
// # where it says insert comment here and insert rating here.

// Create an event handler function for clicking the picture
const displayRamen = (event) => {
    console.log(event.target.id)
    fetchRamen(event.target.id)
}

// Create function to fetch ONE ramen by id
const fetchRamen = id => {
    fetch(URL + id)
    .then(res => res.json())
    .then(oneRamen => {
        updateDisplayRamen(oneRamen)
    })
}

const updateDisplayRamen = oneRamen => {
    ramenDetail.querySelector(".detail-image").src = oneRamen.image
    ramenDetail.querySelector(".detail-image").alt = oneRamen.name
    ramenDetail.querySelector(".name").innerHTML = oneRamen.name
    ramenDetail.querySelector(".restaurant").innerText = oneRamen.restaurant
}

// # Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. 
// # The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.

const ramenForm = document.getElementById("new-ramen")

const submitNewRamen = event => {
    event.preventDefault()
    const newRamenObj = {
        name: ramenForm.name.value,
        restaurant: ramenForm.restaurant.value,
        image: ramenForm.image.value,
        rating: ramenForm.rating.value,
        comment: ramenForm.comment.value,
    }
    // debugger
    createRamenImage(newRamenObj)
}



const init = () => {
    fetchAllRamen()
    ramenForm.addEventListener("submit", submitNewRamen)
}

init() 