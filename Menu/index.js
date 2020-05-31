//what screen is being showed, the menu or the checkout.
let screen = 0;

//the cart items, their name elements and their price elements. all in arrays.
let cartItems = [];
let cartItemsToShow = [];
let cartPricesToShow = [];

//all of the elements needed to make the cards for the menu, all in arrays.
let menuCards = [];
let menuNames = [];
let menuPrices = [];
let menuButtons = [];

//get the menuItems div for later use
let menuDiv = document.getElementById("menuItems");

//these are used to tell what should be on the menu
let week = 2;
let time = "morning";
let day = 4;

//what is on the current menu
let menuItems;

//what menu title is displayed, morning or lunch.
let menuTitle = document.createElement("p");
menuTitle.id = "menuTitle";
menuTitle.classList = "headers";
document.getElementById("header").appendChild(menuTitle);

//the total price
let totalPrice = 0;

//this displays all of the menu elements including their cards, titles, prices and buttons.
if (time == "morning") {
  //if the time is morning, show the morning menu and title.
  menuTitle.innerHTML = "Morning Tea Menu";
  menuItems = Object.values(menu.content.morningTea);

  for (let i = 0; i < menuItems.length; i++) {
    //add each item from the menu object into their cards and onto the screen
    //this creates the cards
    menuCards[i] = document.createElement("div");
    menuCards[i].classList = "card border-success mb-3 menuCards";
    menuDiv.appendChild(menuCards[i]);

    //this creates the names
    menuNames[i] = document.createElement("p");
    menuNames[i].innerHTML = menuItems[i].name;
    menuNames[i].classList = "itemName card-header";
    menuCards[i].appendChild(menuNames[i]);

    //this creates the prices
    menuPrices[i] = document.createElement("p");
    menuPrices[i].innerHTML = "Price: $" + menuItems[i].price;
    menuPrices[i].classList = "priceText";
    menuCards[i].appendChild(menuPrices[i]);

    //this creates the buttons
    menuButtons[i] = document.createElement("button");
    menuButtons[i].innerHTML = "Add to Cart";
    menuButtons[i].classList = "btn btn-success addToCart buttonColour";
    menuButtons[i].setAttribute("onclick", "addItemToCart(menuItems[" + i + "])");
    menuCards[i].appendChild(menuButtons[i]);
  }
} else {
  //display the lunch menu
  menuTitle.innerHTML = "Lunch Menu";

  //display the current week's lunch menu
  if (week == 1) {
    menuItems = Object.values(menu.content.lunch.week1);
  }
  if (week == 2) {
    menuItems = Object.values(menu.content.lunch.week2);
  }

  //creates the card for the lunch item
  menuCards[0] = document.createElement("div");
  menuCards[0].classList = "card border-success mb-3 lunchCards";
  menuDiv.appendChild(menuCards[0]);

  //creates the name for the lunch item
  menuNames[0] = document.createElement("p");
  menuNames[0].innerHTML = menuItems[day].name;
  menuNames[0].classList = "itemName card-header";
  menuCards[0].appendChild(menuNames[0]);

  //creates the prices for the lunch item
  menuPrices[0] = document.createElement("p");
  menuPrices[0].innerHTML = "Price: $" + menuItems[day].price;
  menuPrices[0].classList = "priceText";
  menuCards[0].appendChild(menuPrices[0]);

  //creates the add to cart button for the lunch item
  menuButtons[0] = document.createElement("button");
  menuButtons[0].innerHTML = "Add to Cart";
  menuButtons[0].classList = "btn btn-success addToCart buttonColour";
  menuButtons[0].setAttribute("onclick", "addItemToCart(menuItems[" + day + "])");
  menuCards[0].appendChild(menuButtons[0]);
}

function addItemToCart(item) {
  //if there is less than 3 morning tea items or less than 1 lunch items
  if ((document.getElementById("cartNumber").innerHTML < 3 &&  time == "morning") || (document.getElementById("cartNumber").innerHTML < 1 && time == "lunch")) {
    //show the card for the cart
    document.getElementById("checkoutItems").style = "display: flex";
    document.getElementById("total").style = "display: initial";
    
    //add the current item to the cart
    cartItems.push(item);

    //add one to the cart counter
    document.getElementById("cartNumber").innerHTML++;

    //add a list element, give it classes, put it inside the ul element and display the items name
    cartItemsToShow.push(document.createElement("li"));
    cartItemsToShow[cartItemsToShow.length - 1].classList ="list-group-item checkoutItem";
    cartItemsToShow[cartItemsToShow.length - 1].innerHTML =cartItems[cartItems.length - 1].name;
    document.getElementById("checkoutList").appendChild(cartItemsToShow[cartItemsToShow.length - 1]);

    //add a p element, give it classes, put it inside of li element and display the price.
    cartPricesToShow.push(document.createElement("p"));
    cartPricesToShow[cartPricesToShow.length - 1].classList = "listPrice";
    cartPricesToShow[cartPricesToShow.length - 1].innerHTML = "$" + cartItems[cartItems.length - 1].price;
    cartItemsToShow[cartItemsToShow.length - 1].appendChild(cartPricesToShow[cartPricesToShow.length - 1]);
    totalPrice += parseFloat(cartItems[cartItems.length - 1].price);

    //make the total price update
    document.getElementById("totalPrice").innerHTML = "Total: $" + totalPrice;
  } else {

    //make sure there is not too many items going in the cart.
    if (time == "morning") {
      alert("You can have a maximum of 3 items at morning tea.");
    } else {
      alert("You can only have 1 lunch item.");
    }
  }
}

function goToCart() {
  if (screen == 0) {
    //move to the cart screen
    document.getElementById("content").style = "transform: translateX(-100%)";
    document.getElementById("html").style = "overflow-y: hidden";
    screen = 1;
  } else {
    //move to the menu screen
    document.getElementById("content").style = "transform: translateX(0)";
    document.getElementById("html").style = "overflow-y: initial";
    screen = 0;
  }
}

function toggleCredentialScreen() {
  if (screen != 2) {
    document.getElementById("credentials").style = "display: inherit";
    screen = 2;
  } else {
    document.getElementById("credentials").style = "display: none";
    screen = 1;
  }
}
