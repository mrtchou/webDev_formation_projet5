//Initialisation du local storage
let KanapDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
const positionPanierVide = document.querySelector("#cart__items");







// Si le panier est vide
function getCart() {
    if (KanapDansLocalStorage === null || KanapDansLocalStorage == 0) {
        const panierVide = `<p>Votre panier est vide</p>`;
        positionPanierVide.innerHTML = panierVide;
    } else {
        for (let produit in KanapDansLocalStorage) {

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            //attribution de class a "productArticle"
            productArticle.className = "cart__item";
            //
            productArticle.setAttribute('data-id', KanapDansLocalStorage[produit].idProduit);
            console.log(KanapDansLocalStorage[produit])



            // Insertion de l'élément "div"
            let productDiv = document.createElement("div");
            productArticle.appendChild(productDiv);
            productDiv.className = "cart__item__img";



            // Insertion de l'image
            let productImg = document.createElement("img");
            productDiv.appendChild(productImg);
            productImg.src = KanapDansLocalStorage[produit].imgProduit;
            productImg.alt = KanapDansLocalStorage[produit].altImgProduit;



            // Insertion de l'élément "div" 
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";



            // Insertion de l'élément "div"
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";



            // Insertion du titre h3
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = KanapDansLocalStorage[produit].nomProduit;



            // Insertion de la couleur
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = KanapDansLocalStorage[produit].couleurProduit;
            productColor.style.fontSize = "23px";



            // Insertion du prix
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = KanapDansLocalStorage[produit].prixProduit + " €";




            // Insertion de l'élément "div"
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";



            // Insertion de l'élément "div"
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";



            // Insertion de "Qte : "
            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Quantité : ";


            // Insertion de la quantité
            //on cre d'abord "input" on le definit comme enfant dela "div" plus haut
            //puis on donne valeur depuis localStorage de "quantiteProduit"
            //et insere cette donne ala class "itemQuantite" sur page cart.html
            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = KanapDansLocalStorage[produit].quantiteProduit;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");



            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }

    }
}

getCart();









function getTotals() {

    // Récupération du total des articles
    /**
     * la class "itemQuantite" est injecté, puis on releve la langueur de cette class
     * puis on parcours cette langueur avec FOR, et rempli "totalQuantite"
     * et on demande que ce soit un number avec "valueAsNumber" qui est incrementé pour "totlaQuantite"
     */
    let elementsQuantite = document.getElementsByClassName('itemQuantity');
    let elementsQuantiteLength = elementsQuantite.length,
        totalQuantite = 0;

    for (i = 0; i < elementsQuantiteLength; i++) {
        totalQuantite += elementsQuantite[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQuantite;



    // Récupération du prix total des articles 
    //avec "FOR" on incremente jusquà ce que le resultat soit superieur "elementsQuantiteLength"
    /**puis on multipli cela par prix qui figure dans localStorage
     * puis on injecte cette valeur dans cart.html avec "id totalPrice"
     */
    totalPrice = 0;

    for (i = 0; i < elementsQuantiteLength; i++) {
        totalPrice += (elementsQuantite[i].valueAsNumber * KanapDansLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();









// Modification d'une quantité de produit deja present dans localStorage
function modificationQuantite() {
    let quantiteModifie = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < quantiteModifie.length; k++) {
        quantiteModifie[k].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = KanapDansLocalStorage[k].quantiteProduit;
            let quantiteModifieValue = quantiteModifie[k].valueAsNumber;

            const resultFind = KanapDansLocalStorage.find((el) => el.quantiteModifieValue !== quantityModif);

            resultFind.quantiteProduit = quantiteModifieValue;
            KanapDansLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(KanapDansLocalStorage));

            // refresh rapide
            location.reload();
        })
    }
}
modificationQuantite();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++) {
        btn_supprimer[j].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = KanapDansLocalStorage[j].idProduit;
            let colorDelete = KanapDansLocalStorage[j].couleurProduit;

            KanapDansLocalStorage = KanapDansLocalStorage.filter(el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(KanapDansLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function () {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
}
getForm();








//Envoi des infos au localstorage
function postForm() {
    //slection du btn "Valider" dans le panier cart.html
    const btnCommander = document.getElementById("order");

    //au click sur le btn "Valider" dans le panier
    btnCommander.addEventListener("click", (event) => {

        //Récupére infos du form
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        console.log(inputName);



        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i < KanapDansLocalStorage.length; i++) {
            idProducts.push(KanapDansLocalStorage[i].idProduit);
        }

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        }



        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);

                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message);
            });
    })
}
postForm();
