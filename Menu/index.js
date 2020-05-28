let morningTeaItems = Object.values(menu.content.morningTea);
let morningTeaCards = [];
let morningTeaNames = [];
let morningTeaPrices = [];
let morningTeaButtons = [];
let menuDiv = document.getElementById("menuItems");

for (let i = 0; i < morningTeaItems.length; i++) {
  morningTeaCards[i] = document.createElement("div");
  morningTeaCards[i].classList = "card border-success mb-3 menuCards";
  menuDiv.appendChild(morningTeaCards[i]);

  morningTeaNames[i] = document.createElement("p");
  morningTeaNames[i].innerHTML = morningTeaItems[i].name;
  morningTeaNames[i].classList = "itemName card-header";
  morningTeaCards[i].appendChild(morningTeaNames[i]);

  morningTeaPrices[i] = document.createElement("p");
  morningTeaPrices[i].innerHTML = "Price: $" + morningTeaItems[i].price;
  morningTeaPrices[i].classList = "priceText";
  morningTeaCards[i].appendChild(morningTeaPrices[i]);

  morningTeaButtons[i] = document.createElement("button");
  morningTeaButtons[i].innerHTML = "Add to Cart";
  morningTeaButtons[i].classList = "btn btn-success addToCart";
  morningTeaCards[i].appendChild(morningTeaButtons[i]);

  console.log(morningTeaItems[i].name);
  console.log(morningTeaItems[i].price);
}
