let menuCards = [];
let menuNames = [];
let menuPrices = [];
let menuButtons = [];
let menuDiv = document.getElementById("menuItems");
let week = 1;
let time = "morning";
let day = 0;
let menuItems;
let menuTitle = document.createElement("p");
menuTitle.id = "menuTitle";
document.getElementById("header").appendChild(menuTitle);

if (time == "morning") {
  menuTitle.innerHTML = "Morning Tea Menu";
  menuItems = Object.values(menu.content.morningTea);

  for (let i = 0; i < menuItems.length; i++) {
    menuCards[i] = document.createElement("div");
    menuCards[i].classList = "card border-success mb-3 menuCards";
    menuDiv.appendChild(menuCards[i]);

    menuNames[i] = document.createElement("p");
    menuNames[i].innerHTML = menuItems[i].name;
    menuNames[i].classList = "itemName card-header";
    menuCards[i].appendChild(menuNames[i]);

    menuPrices[i] = document.createElement("p");
    menuPrices[i].innerHTML = "Price: $" + menuItems[i].price;
    menuPrices[i].classList = "priceText";
    menuCards[i].appendChild(menuPrices[i]);

    menuButtons[i] = document.createElement("button");
    menuButtons[i].innerHTML = "Add to Cart";
    menuButtons[i].classList = "btn btn-success addToCart";
    menuCards[i].appendChild(menuButtons[i]);
  }
} else {
  menuTitle.innerHTML = "Lunch Menu";
  if (week == 1) {
    menuItems = Object.values(menu.content.lunch.week1);
  }
  if (week == 2) {
    menuItems = Object.values(menu.content.lunch.week2);
  }

  menuCards[0] = document.createElement("div");
  menuCards[0].classList = "card border-success mb-3 menuCards";
  menuDiv.appendChild(menuCards[0]);

  menuNames[0] = document.createElement("p");
  menuNames[0].innerHTML = menuItems[day].name;
  menuNames[0].classList = "itemName card-header";
  menuCards[0].appendChild(menuNames[0]);

  menuPrices[0] = document.createElement("p");
  menuPrices[0].innerHTML = "Price: $" + menuItems[day].price;
  menuPrices[0].classList = "priceText";
  menuCards[0].appendChild(menuPrices[0]);

  menuButtons[0] = document.createElement("button");
  menuButtons[0].innerHTML = "Add to Cart";
  menuButtons[0].classList = "btn btn-success addToCart";
  menuCards[0].appendChild(menuButtons[0]);
}
