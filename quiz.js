let inventory = [];

function populatePage (e) {
    // Loop over the inventory and populate the page
    const carList = document.querySelector('.autos');
    inventory = JSON.parse(e.target.responseText);
    console.log(inventory);
    // Now that the DOM is loaded, establish all the event listeners needed
    //activateEvents();
}

// Load the inventory and send a callback function to be
// invoked after the process is complete
const inventoryLoader = new XMLHttpRequest();
inventoryLoader.addEventListener('load', populatePage);
inventoryLoader.open('GET', 'inventory.json');
inventoryLoader.send();
