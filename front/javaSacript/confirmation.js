


function main() {
    const numeroCommande = document.getElementById("orderId");

    numeroCommande.textContent = localStorage.getItem("orderId");

    console.log(numeroCommande)
    console.log(localStorage)
    console.log(localStorage.getItem("orderId"))

    //localStorage.clear();
}

main();