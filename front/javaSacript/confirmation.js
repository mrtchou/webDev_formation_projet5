
//avec la function  je selection balise id
//puis depuis local storage jinsere au format txt les donne de local storage a l'endroit de cette balise pour afficher id order
//puis a la fin je vide le local storage avec key "produit"

function main() {

    const numeroCommande = document.getElementById("orderId");

    numeroCommande.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    //localStorage.clear();
    localStorage.removeItem("produit");

}
main();
