// to differentiate the confirmation and hamper page
const page = document.location.href;
// Retrieve products from the api
if (page.match("cart")) {
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((objectProducts) => {
      console.log(objectProducts);
      Displayhamper(objectProducts);
  })}
// Function determines the conditions for displaying the products in the hamper
function Displayhamper(index) {
// we get the converted hamper
let hamper = JSON.parse(localStorage.getItem("basketStocked"));
// if there is a hamper
if (hamper && hamper.length != 0) {
// value correspondence zone of the api and the hamper thanks to the product id chosen in the localStorage
for (let choice of hamper) {
      console.log(choice);
      for (let i = 0, j = index.length; i < j; i++) {
        if (choice._id === index[i]._id) {
// create and add values ​​to hamper that will be used for dataset values
          choice.name = index[i].name;
          choice.prix = index[i].price;
          choice.image = index[i].imageUrl;
          choice.description = index[i].description;
          choice.alt = index[i].altTxt;
        }
      }
    }
// here hamper with the values ​​of the local storage + the values ​​defined above
display(hamper);
  } else {
// information if there is no hamper
document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
// stay tuned with the following functions to change the display
changeQuantity();
  delet();
}
function display(indexed) {
  let hamperArea = document.querySelector("#cart__items");
  hamperArea.innerHTML += indexed.map((choice) => 
  `<article class="cart__item" data-id="${choice._id}" data-color="${choice.color}" data-quantity="${choice.quantity}" data-prix="${choice.prix}"> 
    <div class="cart__item__img">
      <img src="${choice.image}" alt="${choice.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${choice.name}</h2>
        <span>color : ${choice.color}</span>
        <p data-prix="${choice.prix}">${choice.prix} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choice.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${choice._id}" data-color="${choice.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
    ).join(""); 
// we replace the commas of junctions of the objects of the array by an empty one
// stay tuned for quantity changes for display and refresh data
totalProduct();
}

function changeQuantity() {
  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    cart.addEventListener("change", (eq) => {
// information check of the value of the click and its positioning in the articles
let hamper = JSON.parse(localStorage.getItem("basketStocked"));
// loop to modify the quantity of the product in the hamper thanks to the new value
for (article of hamper)
        if (
          article._id === cart.dataset.id &&
          cart.dataset.color === article.color
        ) {
          article.quantity = eq.target.value;
          localStorage.basketStocked = JSON.stringify(hamper);
// we update the quantity dataset
cart.dataset.quantity = eq.target.value;
          // update data
          totalProduct();
        }
    });
  });
}

function delet() {
  const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
// for each cartdelete element
cartdelete.forEach((cartdelete) => {
// We listen if there is a click in the article concerned
cartdelete.addEventListener("click", () => {
// call the local storage resource
let hamper = JSON.parse(localStorage.getItem("basketStocked"));
      for (let d = 0, c = hamper.length; d < c; d++)
        if (
          hamper[d]._id === cartdelete.dataset.id &&
          hamper[d].color === cartdelete.dataset.color
        ) {
// useful variable declaration for deletion
const num = [d];
          let newhamper = JSON.parse(localStorage.getItem("basketStocked"));
//removal of 1 element at index num
newhamper.splice(num, 1);
// informative display
if (newhamper && newhamper.length == 0) {
            document.querySelector("#totalQuantity").innerHTML = "0";
            document.querySelector("#totalPrice").innerHTML = "0";
            document.querySelector("h1").innerHTML =
              "Vous n'avez pas d'article dans votre hamper";
          }
// we return the new converted hamper to the local storage and we play the function
localStorage.basketStocked = JSON.stringify(newhamper);
          totalProduct(); 
// we reload the page that is displayed without the product thanks to the new hamper
return location.reload();
        }
    });
  });}

function totalProduct() {
  let totalArticle = 0;
  let totalPrix = 0;
  const cart = document.querySelectorAll(".cart__item");
// for each cart element
cart.forEach((cart) => {
// we retrieve the quantities of the products thanks to the dataset
totalArticle += JSON.parse(cart.dataset.quantity);
// we created an operator for the total produced using the dataset
totalPrix += cart.dataset.quantity * cart.dataset.prix;
  });
// I point to the item number display location
document.getElementById("totalQuantity").textContent = totalArticle;
// I point to where the total price is displayed
document.getElementById("totalPrice").textContent = totalPrix;
}
//  form
// the customer's data will be stored in this table for the order on the cart page
if (page.match("cart")) {
  var contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient);

  var prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  var nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  var ville = document.querySelector("#city");
  ville.classList.add("regex_texte");
  var adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse");
  var email = document.querySelector("#email");
  email.classList.add("regex_email");
  var regexTexte = document.querySelectorAll(".regex_texte");
// modification of the type of the input type email to text because it does not comply with the regex
document.querySelector("#email").setAttribute("type", "text");
}
//regex 
let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// Listen and assign point (for click security) if these fields are ok according to the regex
if (page.match("cart")) {
  regexTexte.forEach((regexTexte) =>
    regexTexte.addEventListener("input", (e) => {
      valeur = e.target.value;
// regNormal will be the value of the regex response, 0 or -1
let regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient.firstName = prenom.value;
        contactClient.lastName = nom.value;
        contactClient.city = ville.value;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      colorRegex(regNormal, valeur, regexTexte);
      valideClic();
    })
  );
}

// the field listened to via the regex regexLettre will make the zone concerned react, thanks to TexteInfo
texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville);

// Listen and assign point (for click security) if these fields are ok according to the regex
if (page.match("cart")) {
  let regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", (e) => {
    valeur = e.target.value;
// regNormal will be the value of the regex response, 0 or -1
let regAdresse = valeur.search(regexChiffreLettre);
    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }
    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    colorRegex(regAdresse, valeur, regexAdresse);
    valideClic();
  });
}

// the field listened to via the regex regexNumberLetter will make the zone concerned react, thanks to TexteInfo
texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);

// Listen and assign point (for click security) if this field is ok according to the regex
if (page.match("cart")) {
  let regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", (e) => {
    valeur = e.target.value;
// my address must have this form so that I can validate it
let regMatch = valeur.match(regMatchEmail);
// when the result is correct, the console log will display an answer other than null, regValide = 0 or -1
let regValide = valeur.search(regValideEmail);
    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    colorRegex(regValide, valeur, regexEmail);
    valideClic();
  });
}

// text under email field
if (page.match("cart")) {
  email.addEventListener("input", (e) => {
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);

// if value is always an empty string and the regex differs from 0 (regex at -1 and the field is empty
    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
      document.querySelector("#emailErrorMsg").style.color = "white";
      //if value is no longer an empty string and the regex differs from 0
    } else if ( regValide !== 0) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
      document.querySelector("#emailErrorMsg").style.color = "white";
// for the rest of the cases (when the regex detects no error and is 0 regardless of the field since it is validated by the regex)
} else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    }
  });
}

// colorRegex function that will modify the color of the input by typed padding, visual aid and accessibility
// we determine a starting value at value which will be a string
let listenValue = "";
// reusable 3-argument function
function colorRegex(regSearch, listenValue, inputAction) {
// if value is still an empty string and the regex differs from 0 (regex at -1 and the field is empty but no error)
if (listenValue === "" && regSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";
// if value is no longer an empty string and the regex differs from 0 (regex at -1 and the field is not empty so there is an error)
} else if (listenValue !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
// for the rest of the cases (when the regex detects no error and is 0 regardless of the field since it is validated by the regex)
} else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}
//--------------------------------------------------------------
// fonction d'affichage individuel des paragraphes sous input sauf pour l'input email
//--------------------------------------------------------------
function texteInfo(regex, target, zoneListening) {
      if (page.match("cart")) {
      zoneListening.addEventListener("input", (e) => {
      valeur = e.target.value;
      index = valeur.search(regex);
// if value is still an empty string and the regex differs from 0 (regex at -1 and the field is empty but no error)
if (valeur === "" && index != 0) {
        document.querySelector(target).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(target).style.color = "white";
// if value is no longer an empty string and the regex differs from 0 (regex at -1 and the field is not empty so there is an error)
} else if (valeur !== "" && index != 0) {
        document.querySelector(target).innerHTML = "Reformulez cette donnée";
        document.querySelector(target).style.color = "white";
// for the rest of the cases (when the regex detects no error and is 0 regardless of the field since it is validated by the regex)
} else {
      document.querySelector(target).innerHTML = "Caratères acceptés pour ce champ.";
      document.querySelector(target).style.color = "white";
      }
    });
  }
}
// Function of validation/access to the click of the button of the form
let commande = document.querySelector("#order");
// the function is used to validate the command click interactively
function valideClic() {
  let contactRef = JSON.parse(localStorage.getItem("contactClient"));
  let sum =
    contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
  if (sum === 5) {
    commande.removeAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Commander !");
  } else {
    commande.setAttribute("disabled", "disabled");
    document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
  }
}
// Sending the order

if (page.match("cart")) {
  commande.addEventListener("click", (e) => {
// prevents reloading the page we prevent the reload of the button
e.preventDefault();
    valideClic();
    sendHamper();
  });
}
// function retrieves ids then put in an array
// definition of the hamper which will only include the ids of the products chosen from the local storage
let hamperId = [];
function tableId() {
let hamper = JSON.parse(localStorage.getItem("basketStocked"));
// retrieve product ids from hamperId
if (hamper && hamper.length > 0) {
  for (let hint of hamper) {
    hamperId.push(hint._id);
  }
} else {
  console.log("le panier est vide");
  document.querySelector("#order").setAttribute("value", "Panier vide!");
}
}
// function retrieving customer and hamper data before transformation

let contactRef;
let finalOrder;
function pack() {
  contactRef = JSON.parse(localStorage.getItem("contactClient"));
// definition of the command object
finalOrder = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: hamperId,
  };
}
// function on sending validation

function sendHamper() {
  tableId();
  pack();
  console.log(finalOrder);
  let sum = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
// if the cartId contains items and the click is allowed
if (hamperId.length != 0 && sum === 5) {
// send to api resource
fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalOrder),
    })
      .then((res) => res.json())
      .then((data) => {
// sent to the confirmation page
window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
      })
  }
}
