let inventory = [];
let autoSection = document.querySelector('.autos');


function populatePage (e) {
    // Loop over the inventory and populate the page
    const carList = document.querySelector('.autos');
    inventory = JSON.parse(e.target.responseText);
    //console.log(inventory);
    // for loop to load all cars
    autoSection.innerHTML = "";
    let carInventory = "";
    for (let i = 0; i < inventory.cars.length; i++) {
        carInventory +=
        `<div class="col-md-4 col-sm-6">
            <div class="card">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${inventory.cars[i].year} ${inventory.cars[i].make} ${inventory.cars[i].model}</li>
                </ul>
                <img class="card-img-top" src="${inventory.cars[i].image}">
                <div class="card-block">
                    <p class="card-text">${inventory.cars[i].description}</p>
                    <h5 class="card-title">$${inventory.cars[i].price}</h5>
                </div>
            </div>
        </div>`;
        // for every 3 cards we need a wrapper div with class of row
        // if i%3 === 0 close div might need ++i instead modulus

    }
    // write to the HTML
    autoSection.innerHTML = carInventory;
    //get number of cards on page
    //console.log(document.querySelectorAll('.card').length);

    // Now that the DOM is loaded, establish all the event listeners needed
    activateEventListeners();
}

document.querySelector('.card').addEventListener('click', function(e){
  console.dir(e.currentTarget);
  // activateEventListeners(e);
})

function activateEventListeners() {
    // event listener on the cards
    for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
        document.querySelectorAll('.card')[i].addEventListener('click', function(e){
            //if a card is already clicked then remove the class and add it to the one that is clicked
            if (document.querySelector('.cardClick')) {
                document.querySelector('.cardClick').classList.remove('cardClick');
            }
            // add the class of cardClick to the clicked card
            e.currentTarget.classList.add("cardClick");
            // move focus to the description field in the navbar
            let descriptionField = document.querySelector('.form-control');
            descriptionField.focus();
            editCardDescription();
        })
    }
};

///////////////////////////
//     You are here      //
///////////////////////////

function editCardDescription () {
    // event listener on the description input, include keyup listener
    let editHighlightedCard = document.querySelector('.cardClick').querySelector('.card-block').querySelector('p').innerHTML;
    console.log(editHighlightedCard);
}

// Load the inventory and send a callback function to be
// invoked after the process is complete
const inventoryLoader = new XMLHttpRequest();
inventoryLoader.addEventListener('load', populatePage);
inventoryLoader.open('GET', 'inventory.json');
inventoryLoader.send();
