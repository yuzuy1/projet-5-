// function display of the order number and empty storage when on the confirmation page
(function Commande() {
    if (page.match("confirmation")) {
      sessionStorage.clear();
      localStorage.clear();
  // value of the order number
      let numCom = new URLSearchParams(document.location.search).get("commande");
      document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
      console.log("value de l'orderId venant de l'url: " + numCom);
  //reset order number
      numCom = undefined;
    } 
  })();