let linkCurentUrl = window.location.href;

let url = new URL(linkCurentUrl);

let idProduct = url.searchParams.get("id");

console.log(idProduct);

let article = "";



const colorChosen = document. querySelector("#colors");

const quantityChosen = document.querySelector("#quantity");



getArticle();



// Récupération des articles de l'API

function getArticle() {

fetch("http://localhost:3000/api/products/" + idProduct)

.then((res) => {

return res.json();

})
