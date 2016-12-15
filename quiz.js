let inventory = [];
let autoSection = document.querySelector('.autos');

//function calls
loadInventory();

// Load the inventory and send a callback function to be invoked after the process is complete
function loadInventory() {
    const inventoryLoader = new XMLHttpRequest();
    inventoryLoader.addEventListener('load', populatePage);
    inventoryLoader.open('GET', 'inventory.json');
    inventoryLoader.send();
}

// parse JSON and populate page
function populatePage (e) {
    inventory = JSON.parse(e.target.responseText);
    // Get reference to the autos section of html
    const carList = document.querySelector('.autos');
    // empty the autos section
    autoSection.innerHTML = "";
    // declare car inventory variable
    let carInventory = "";
    // loop over the inventory and load to page
    for (let i = 0; i < inventory.cars.length; i++) {
        if (i%3 === 0) {
            carInventory += `<div class="row">`;
        }
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
        if (i%3 === 2) {
            carInventory += `</div>`;
        }
        if (i === (inventory.cars.length - 1)) {
            carInventory += `</div>`
        }
    }
    // write to the HTML
    autoSection.innerHTML = carInventory;

    // Now that the DOM is loaded, establish all the event listeners needed
    activateEventListeners();
}

function activateEventListeners() {
    // event listener on the cards
    for (let i = 0; i < document.querySelectorAll('.card').length; i++) {
        document.querySelectorAll('.card')[i].addEventListener('click', (e) => {
            // if the current card already has the cardClick class then remove it and background color
            if (e.currentTarget.classList.contains('cardClick')) {
                // e.currentTarget.classList.remove('cardClick');
                resetStyling();
            // if another card is clicked then remove the class and background color and add it to the one that is clicked
            } else if (document.querySelector('.cardClick')) {
                resetStyling();
                e.currentTarget.classList.add("cardClick");
                changeCardColor(e, "red");
            // else add the cardClick class to the target and change the background color
            } else {
                e.currentTarget.classList.add("cardClick");
                changeCardColor(e, "red");
            }
        });
    }
    // editCardDescription();
};

function resetStyling () {
    // if the
    if (document.querySelector('.cardClick')) {
        document.querySelector('.cardClick').classList.remove('cardClick');
    }
    for (let i = 0; i < inventory.cars.length; i++) {
        document.querySelectorAll('.card')[i].style.backgroundColor = '';
    }
}

function changeCardColor (e, color) {

    // move focus to the description field in the navbar
    let descriptionField = document.querySelector('.form-control');
    descriptionField.value = "";
    descriptionField.focus();
    //resetStyling(e);
    e.currentTarget.style.backgroundColor = color;
    editCardDescription();
}

function editCardDescription () {
    // event listener on the description input, include keyup listener
    let newDescription = document.querySelector('.form-control');
    console.log(newDescription);

    // on keyup event change the text
    newDescription.addEventListener('keyup', (e) => {
        let editHighlightedCard = document.querySelector('.cardClick').querySelector('.card-block').querySelector('p');
        if (e.key === "Enter") {
            newDescription.value = "";
        } else {
            editHighlightedCard.innerHTML = newDescription.value;
        }
    });
}
