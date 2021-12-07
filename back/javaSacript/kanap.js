
sectionARemplir();

// Récupération des articles de l'API
async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}



async function sectionARemplir() {
    let result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {



            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

        }
    })
    .catch (function(error){
        return error;
    });
}