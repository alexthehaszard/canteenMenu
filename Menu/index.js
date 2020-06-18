//what screen is being showed, the menu or the checkout.
let screen = 0;

//how many items of each type are in the cart
let morningTeaItems = 0;
let lunchItems = 0;

//arrays for the items in the lunch menu
let lunchWeek1 = Object.values(menu.content.lunch.week1);
let lunchWeek2 = Object.values(menu.content.lunch.week2);

//the cart items, their name elements and their price elements. all in lists.
let cartItems = [];
let cartItemsToShow = [];
let cartPricesToShow = [];
let cartItemsRemoveButtons = [];
let cartItemsAddButtons = [];
let cartAmounts = [];

//all of the elements needed to make the cards for the menu, all in lists.
let menuCards = [];
let menuNames = [];
let menuPrices = [];
let menuButtons = [];
let menuTitle;

//order complete list of elements.
let orderCompleteElements = [];

//if the day dropdown menu is open
let dropdownOpen = false;

//get the menuItems div for later use
let menuDiv = document.getElementById("menuItems");

//what is on the current menu
let menuItems;

//the total price
let totalPrice = 0;

//these are used to tell what should be on the menu
let week = 1;
let day = 0;
let time = "morning";
showMenu();

//the max amount of a certain
let maxMorningTea = 3;
let maxLunch = 1;

//this displays all of the menu elements including their cards, titles, prices and buttons.
function showMenu() {
  menuDiv.innerHTML = "";
  if (time === "morning" && screen !== 1) {
		//display the morning tea menu
		//get the morning tea options from the object
    menuItems = Object.values(menu.content.morningTea);
		document.getElementById("header").innerHTML = "";

    for (let i = 0; i < menuItems.length; i++) {
      //add each item from the menu object into their cards and onto the screen
      //this creates the cards
      menuCards[i] = document.createElement("div");
      menuCards[i].classList = "card mb-3 menu-cards";
      menuDiv.appendChild(menuCards[i]);

      //this creates the names
      menuNames[i] = document.createElement("p");
      menuNames[i].innerHTML = menuItems[i].name;
      menuNames[i].classList = "item-name card-header";
      menuCards[i].appendChild(menuNames[i]);

      //this creates the prices
      menuPrices[i] = document.createElement("p");
      menuPrices[i].innerHTML = `Price: $${menuItems[i].price}`;
      menuPrices[i].classList = "price-text";
      menuCards[i].appendChild(menuPrices[i]);

      //this creates the buttons
      menuButtons[i] = document.createElement("button");
      menuButtons[i].innerHTML = "Add to Cart";
      menuButtons[i].classList = "btn btn-success add-to-cart button-colour";
      menuButtons[i].setAttribute("onclick", `addItemToCart(menuItems[${i}])`);
      //disable the button if the item is already in cart.
      if (cartItems.includes(menuItems[i])) {
        menuButtons[i].disabled = true;
      }
      menuCards[i].appendChild(menuButtons[i]);
    }
  } else {
    //display the lunch menu
    //display the current week's lunch menu
		
    if (week === 1) {
      menuItems = Object.values(menu.content.lunch.week1);
    }
    if (week === 2) {
      menuItems = Object.values(menu.content.lunch.week2);
    }
		
		//create the title for the lunch menu
		document.getElementById("header").innerHTML = "";
		menuTitle = document.createElement("p");
		menuTitle.style = "position: relative; margin-top: 10px; text-align: center; font-weight: bold";
		menuTitle.innerHTML = `${menuItems[day].day} Week ${week}`
		document.getElementById("header").appendChild(menuTitle);
    
    //creates the card for the lunch item
    menuCards[0] = document.createElement("div");
    menuCards[0].classList = "card mb-3 lunch-cards";
    menuDiv.appendChild(menuCards[0]);

    //creates the name for the lunch item
    menuNames[0] = document.createElement("p");
    menuNames[0].innerHTML = menuItems[day].name;
    menuNames[0].classList = "item-name card-header";
    menuCards[0].appendChild(menuNames[0]);

    //creates the prices for the lunch item
    menuPrices[0] = document.createElement("p");
    menuPrices[0].innerHTML = `Price: $${menuItems[day].price}`;
    menuPrices[0].classList = "price-text";
    menuCards[0].appendChild(menuPrices[0]);

    //creates the add to cart button for the lunch item
    menuButtons[0] = document.createElement("button");
    menuButtons[0].innerHTML = "Add to Cart";
    menuButtons[0].classList = "btn btn-success add-to-cart button-colour";
    menuButtons[0].setAttribute("onclick", `addItemToCart(menuItems[${day}])`);
    //disable the button if the item is already in the cart
    if (cartItems.includes(menuItems[0])) {
      menuButtons[0].disabled = true;
    }
    menuCards[0].appendChild(menuButtons[0]);
  }
}

function addItemToCart(item) {
  //if there is less than 3 morning tea items or less than 1 lunch items
  if ((morningTeaItems < maxMorningTea && time === "morning") || (lunchItems < maxLunch && time === "lunch")) {
    //keep track of how many lunch/morning tea items you have and disable the button
    if (time === "morning") {
      morningTeaItems++;
      menuButtons[menuItems.indexOf(item)].disabled = true;
    } else {
      lunchItems++;
      menuButtons[0].disabled = true;
    }

    //show the card for the cart
    document.getElementById("checkoutItems").style = "display: flex";
    document.getElementById("total").style = "display: initial";

    //add the current item to the cart
    cartItems.push(item);

    //add one to the cart counter
    document.getElementById("cartNumber").innerHTML++;

    //add a list element, give it classes, put it inside the ul element and display the items name
    cartItemsToShow.push(document.createElement("li"));
    cartItemsToShow[cartItemsToShow.length - 1].classList = "list-group-item checkout-item";
    cartItemsToShow[cartItemsToShow.length - 1].innerHTML = cartItems[cartItems.length - 1].name;
    document.getElementById("checkoutList").appendChild(cartItemsToShow[cartItemsToShow.length - 1]);

    //add a p element, give it classes, put it inside of li element and display the price.
    cartPricesToShow.push(document.createElement("p"));
    cartPricesToShow[cartPricesToShow.length - 1].classList = "list-price";
    cartPricesToShow[cartPricesToShow.length - 1].innerHTML = "$" + cartItems[cartItems.length - 1].price;
    cartItemsToShow[cartItemsToShow.length - 1].appendChild(cartPricesToShow[cartPricesToShow.length - 1]);
    totalPrice += parseFloat(cartItems[cartItems.length - 1].price);

    //adds the remove item button
    cartItemsRemoveButtons.push(document.createElement("button"));
    cartItemsRemoveButtons[cartItemsRemoveButtons.length - 1].classList ="btn btn-warning remove-item";
    cartItemsRemoveButtons[cartItemsRemoveButtons.length - 1].innerHTML = "-";
    cartItemsRemoveButtons[cartItemsRemoveButtons.length - 1].setAttribute("onclick", `removeItem(${cartItemsRemoveButtons.length - 1})`);
    cartItemsToShow[cartItemsToShow.length - 1].appendChild(cartItemsRemoveButtons[cartItemsRemoveButtons.length - 1]);

    //add the add item button
    cartItemsAddButtons.push(document.createElement("button"));
    cartItemsAddButtons[cartItemsAddButtons.length - 1].classList = "btn btn-warning add-item";
    cartItemsAddButtons[cartItemsAddButtons.length - 1].innerHTML = "+";
    cartItemsAddButtons[cartItemsAddButtons.length - 1].setAttribute("onclick", `addItem(${cartItemsAddButtons.length - 1})`);
    cartItemsToShow[cartItemsToShow.length - 1].appendChild(cartItemsAddButtons[cartItemsAddButtons.length - 1]);

    if (lunchWeek1.includes(item) || lunchWeek2.includes(item)) {
      cartItemsAddButtons[cartItemsAddButtons.length - 1].disabled = true;
    }

    //add the total text
    cartAmounts.push(document.createElement("p"));
    cartAmounts[cartAmounts.length - 1].innerHTML = 1;
    cartAmounts[cartAmounts.length - 1].classList = "item-count";
    cartItemsToShow[cartItemsToShow.length - 1].appendChild(cartAmounts[cartAmounts.length - 1]);

    //make the total price update
    document.getElementById("totalPrice").innerHTML = `Total: $${totalPrice}`;
  } else {
    //make sure there is not too many items going in the cart.
    if (time === "morning") {
      alert("You can have a maximum of 3 different items at morning tea.");
    } else {
      alert("You can only have 1 lunch item.");
    }
  }
}

function goToCart() {
  if (screen === 0) {
    //move to the cart screen
    document.getElementById("content").style = "transform: translateX(-100%)";
    screen = 1;
    //after 500ms, remove the screen that is not being looked at.
    setTimeout(function(){
      showMenu();
    }, 500);
  } else {
    //move to the menu screen
    document.getElementById("content").style = "transform: translateX(0)";
    document.getElementById("html").style = "overflow-y: initial";
    screen = 0;
    showMenu();
  }
}


//opens the place order screen
function toggleCredentialScreen() {
  if (screen !== 2) {
    document.getElementById("credentials").style = "display: inherit";
    screen = 2;
  } else {
    document.getElementById("credentials").style = "display: none";
    screen = 1;
  }
}

function removeItem(index) {
  //remove one from the item's total, if there is more than one
  if (cartAmounts[index].innerHTML > 1) {
    //re-enable the cart button, if it is disabled
    cartItemsAddButtons[index].disabled = false;

    //take away one from the total amount
    cartAmounts[index].innerHTML--;

    //update the total price
    totalPrice -= cartItems[index].price;
    document.getElementById("totalPrice").innerHTML = `Total: $${totalPrice}`;
  }
  //if there is only one, then remove the card.
  else {
    if (confirm("Are you sure you want to remove this item from the cart?")) {
      //if it is a lunch item, remove that item from the lunch total, else remove it from the morning tea items.
			if (lunchWeek1.includes(cartItems[index]) || lunchWeek2.includes(cartItems[index])) {
				lunchItems--;
			} else {
				morningTeaItems--;
			}

      //update the total price
      totalPrice -= cartItems[index].price;
      document.getElementById("totalPrice").innerHTML = `Total: $${totalPrice}`;

      //remove the card of the item being removed
      cartItemsToShow[index].parentNode.removeChild(cartItemsToShow[index]);

      //remove the item from all arrays
      cartItems.splice(index, 1);
      cartItemsToShow.splice(index, 1);
      cartPricesToShow.splice(index, 1);
      cartItemsRemoveButtons.splice(index, 1);
      cartAmounts.splice(index, 1);
      cartItemsAddButtons.splice(index, 1);

      //remove the item from the counter by the cart icon
      document.getElementById("cartNumber").innerHTML--;

      //make all of the other remove button onclick events update, as the old values won't work anymore
      for (let i = 0; i < cartItemsRemoveButtons.length; i++) {
        cartItemsRemoveButtons[i].setAttribute("onclick", `removeItem(${i})`);
        cartItemsAddButtons[i].setAttribute("onclick", `addItem(${i})`);
      }

      //if there are no items in the cart, hide the total and the items cards
      if (cartItems.length < 1) {
        document.getElementById("total").style = "display: none";
        document.getElementById("checkoutItems").style = "display: none";
      }
    }
  }
}

function addItem(index) {
  //if there is 3, then disable the button
  if (cartAmounts[index].innerHTML === '2') {
    cartItemsAddButtons[index].disabled = true;
  }

  //add one to the item's total
  cartAmounts[index].innerHTML++;

  //update the total price
  totalPrice += parseInt(cartItems[index].price);
  document.getElementById("totalPrice").innerHTML = `Total: $${totalPrice}`;
}

function changeMenu(timeSelected) {
	//this function changes the menu from morning tea to lunch and vice versa
  document.getElementById(time).disabled = false;
  time = timeSelected;
  showMenu();
  document.getElementById(time).disabled = true;
}

//updates the lunches menu
function updateLunches(wk, dy) {
	week = wk;
	day = dy;
	showMenu();
}

//opens and changes the dropdown menu for changing the day.
function toggleDropdown(id, newid) {
  if (newid === "dropdownWeeks" && dropdownOpen === true) {
    document.getElementById("dropdownItems").style = "display: none";
    dropdownOpen = false;
  }
  else if (newid === null) {
    document.getElementById(id).style = "display: none";
    document.getElementById("dropdownItems").style = "display: none";
    dropdownOpen = false;
  } else {
    if (id !== null) {
      document.getElementById(id).style = "display: none";
    }
    dropdownOpen = true;
    document.getElementById("dropdownItems").style = "display: initial";
    document.getElementById(newid).style = "display: initial";
  }
}

//opens the completed order screen.
function completeOrder() {
  if (document.getElementById('inputName').value === "" || document.getElementById('inputStudentID').value === "" || document.getElementById('inputTutorGroup').value === "") {
    alert("fill out the fields!");
  } else {
    document.getElementById("credentials").style = "display: none";
    document.getElementById("orderComplete").style = "display: initial";
    document.getElementById("cartCard").disabled = true;
    for (let i = 0; i < cartItems.length; i++) {
      orderCompleteElements[i] = document.createElement('p');
      orderCompleteElements[i].classList = "confirm-item list-group-item mgt5";
      orderCompleteElements[i].style = "border-top-width: 2px";
      orderCompleteElements[i].innerHTML = `x${cartAmounts[i].innerHTML} ${cartItems[i].name}`;
      document.getElementById("orderCompleteCard").appendChild(orderCompleteElements[i]);
    }
  }
}