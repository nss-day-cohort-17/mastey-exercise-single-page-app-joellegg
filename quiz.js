let inventory = [];
loadInventory();

function populatePage (e) {
    // Loop over the inventory and populate the page
    const carList = document.querySelector('#usedCarList');
    inventory = JSON.parse(e.target.responseText);
    carList.innerHTML = inventory.cars[0].make;
    console.log(inventory);
    // Now that the DOM is loaded, establish all the event listeners needed
    //activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete

function loadInventory () {
    const inventoryLoader = new XMLHttpRequest();
    inventoryLoader.addEventListener("load", (e) => {
        // whatever anonymous function does.
        console.log(this);
        populatePage(e);
    });
    inventoryLoader.open("GET", 'inventory.json');
    inventoryLoader.send();
}
