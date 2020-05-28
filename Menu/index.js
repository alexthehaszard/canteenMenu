let morningTeaItems = Object.values(menu.content.morningTea);
let morningTeaNames = [];
let menuDiv = document.getElementById("menuItems");

for (let i = 0; i < morningTeaItems.length; i++) {
  morningTeaNames[i] = document.createElement("p");
  morningTeaNames[i].innerHTML = morningTeaItems[i].name;
  morningTeaNames[i].classList = "defaultText";
  document.body.insertBefore(morningTeaNames[i], menuDiv);
  console.log(morningTeaItems[i].name);
  console.log(morningTeaItems[i].price);
}
