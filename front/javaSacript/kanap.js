



sectionARemplir();

// Récupération des articles de l'API
// et mis en attente avec async
async function getProducts() {
    let resultatAPI = await fetch("http://localhost:3000/api/products")
    return resultatAPI.json();

}






async function sectionARemplir() {

    let result = await getProducts()
        .then(function (resultatAPI) {
            const articles = resultatAPI;


            //console.table(articles);
            //creation d'une boucle FOR qui va parcourir le resltatAPI(articles) et mettre chaque ligne dans la variable "article"
            for (let article in articles) {
                //creation variable productLink qui est une balise "a"
                let productLink = document.createElement("a");
                //puis je selectionne la class items dans le index.html et lui ajoute un enfant qui est la balise "a" precedemnt créé
                document.querySelector(".items").appendChild(productLink);
                //je selectionne dans resltatAPI la cle "article et la valeur "_id" et j'ajoute a l'url
                productLink.href = "product.html?id=" + resultatAPI[article]._id;

                //console.log(resultatAPI[article]);




                //creation balise "article" puis je l'ajoute comme enfant a la balise "a" precedemnt cree
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);



                //creation balise "img" puis ajout comme enfant a la variable cree precedement plus haut
                //puis a cette balise on ajoute cle article avec valeur imageUrl et altTxt depuis resultatAPI
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultatAPI[article].imageUrl;
                productImg.alt = resultatAPI[article].altTxt;


                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultatAPI[article].name;


                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultatAPI[article].description;

            }
        })
        .catch(function (error) {
            return error;
        });
}
