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
        //console.log("i", i, (inventory.cars.length - 1));
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
        document.querySelectorAll('.card')[i].addEventListener('click', function(e){
            // if the current card already has the cardClick class then remove it
            if (e.currentTarget.classList.contains('cardClick')) {
                console.log("Tis true. It has the class cardClick")
                e.currentTarget.classList.remove('cardClick');
            // if another card is clicked then remove the class and add it to the one that is clicked
            } else if (document.querySelector('.cardClick')) {
                document.querySelector('.cardClick').classList.remove('cardClick');
                e.currentTarget.classList.add("cardClick");
            // else add the cardClick class to the target
            } else {
                e.currentTarget.classList.add("cardClick");
            }

            // move focus to the description field in the navbar
            let descriptionField = document.querySelector('.form-control');
            descriptionField.value = "";
            descriptionField.focus();
        })
    editCardDescription();
    }
};


function editCardDescription () {
    // event listener on the description input, include keyup listener
    let newDescription = document.querySelector('.form-control');

    // on keyup event change the text
    newDescription.addEventListener('keyup', function(e) {
        let editHighlightedCard = document.querySelector('.cardClick').querySelector('.card-block').querySelector('p');
        if (e.key === "Enter") {
            newDescription.value = "";
        } else {
            editHighlightedCard.innerHTML = newDescription.value;
        }
    });
}


// Load the inventory and send a callback function to be
// invoked after the process is complete
const inventoryLoader = new XMLHttpRequest();
inventoryLoader.addEventListener('load', populatePage);
inventoryLoader.open('GET', 'inventory.json');
inventoryLoader.send();
