



//recuperation de lien adresse url qui est dans l'adresse barre
let linkCurentUrl = window.location.href;

let url = new URL(linkCurentUrl);

//recuperation de l'id qui est dans le lien avec searchParams
let idProduct = url.searchParams.get("id");

//console.log(linkCurentUrl);

let article = "";










//selection de l'id colors sur la page product.html
const chosenColor = document.querySelector("#colors");



//selection de l'id quantity sur la page product.html
const chosenQuantity = document.querySelector("#quantity");






getProduct(); 

// Récupération des articles de l'API
function getProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)

        .then((response) => {
            return response.json();
        })

        // Répartition des données de l'API dans le DOM
        .then(async function (resultatAPI) {

            article = await resultatAPI;

            //console.table(article);


            if (article){
                getKanap(article);
             }
        })
        .catch((error) => {
            alert("Erreur de la requête API fetch");
        })
}





// "article" est declaré plus haut vide, puis rempli avec "resultatAPI"
function getKanap(article){

    // Insertion de l'image avec creation balise img
    let productImg = document.createElement("img");

    document.querySelector(".item__img").appendChild(productImg);

    productImg.src = article.imageUrl;

    productImg.alt = article.altTxt;



    // Modification du titre "h1"
    let productName = document.getElementById('title');

    productName.innerHTML = article.name;



    // Modification du prix
    let productPrice = document.getElementById('price');

    productPrice.innerHTML = article.price;


    // Modification de la description

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;







    // Insertion des options de couleurs depuis le tableau colors
    for (let colors of article.colors){

        //creation balise option
        let productColors = document.createElement("option");

        document.querySelector("#colors").appendChild(productColors);

        productColors.value = colors;

        productColors.innerHTML = colors;
    }
//ici on passe tous les parametres avec "articles" a la function "addToCartPanier()"
    addToCartPanier(article);

}







    //Gestion du panier cart.html

    function addToCartPanier(article) {

        const btn_envoyerPanier = document.querySelector("#addToCartPanier");



        //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100

        btn_envoyerPanier.addEventListener("click", (event)=>{

            if (chosenQuantity.value > 0 && chosenQuantity.value <=10 && chosenQuantity.value != 0){



                //Recupération du choix de la couleur
                let choixCouleurFait = chosenColor.value;


                //Recupération du choix de la quantité
                let choixQuantiteFait = chosenQuantity.value;



                //Récupération des options de l'article à ajouter au panier

                let optionsProduit = {

                idProduit: idProduct,

                couleurProduit: choixCouleurFait,

                quantiteProduit: Number(choixQuantiteFait),

                nomProduit: article.name,

                prixProduit: article.price,

                descriptionProduit: article.description,

                imgProduit: article.imageUrl,

                altImgProduit: article.altTxt

                };






                //Initialisation du local storage
                //avec getItem() on recupere la valeur associé à la cle "produit"
                let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));



                //fenêtre pop-up alert
                //une window confirm est lancé, puis à la fin on redirige avec ajout de "cart.html" a l'adresse url
                const popupConfirmation =() =>{

                    if(window.confirm(`Votre commande de ${choixQuantiteFait} ${article.name} ${choixCouleurFait} est ajoutée au panier

                        Pour consulter votre panier, cliquez sur OK`)){

                        window.location.href ="cart.html";
                        }
                }













                //Importation dans le local storage AJOUT dans le PANIER
                //Si le panier comporte déjà au moins 1 article

                if (produitLocalStorage) {
                    //avec la methode find() on cherche si le produit est deja present dans le localStorage
                    const resultFind = produitLocalStorage.find(

                    (element) => element.idProduit === idProduct && element.couleurProduit === choixCouleurFait);







                    //Si le canapé commandé est déjà dans le panier
                    if (resultFind) {

                        let nouveauQuantite =

                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);

                        resultFind.quantiteProduit = nouveauQuantite;
                        //avec JSON.stringify on convertit tout en json, et on rajoute avec setItem dans la cle ou sera stocké les données
                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                        //console.table(produitLocalStorage);

                        popupConfirmation();

                        //Si le produit commandé n'est pas dans le panier
                        // on refait la meme chose, avec push() on ajoute a la fin du tableau nouveau valeur cle dans "produit"
                        //avec variable "optionProduit" qui contient tous les propriete de l'objet canapé
                    } else {

                        produitLocalStorage.push(optionsProduit);

                        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                        console.table(produitLocalStorage);

                        popupConfirmation();

                    }








            //Si le panier est vide
            //on cree un array vide, puis on rempli avec push() et setItem le localStorage

            } else {

                produitLocalStorage =[];

                produitLocalStorage.push(optionsProduit);

                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

                console.table(produitLocalStorage);

                popupConfirmation();

            }
        }

    });

}

