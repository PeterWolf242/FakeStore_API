import { cart } from "./card";
// import { output } from "./main";

export function shoppingcard() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const body = document.querySelector<HTMLBodyElement>("body");

    // Prüfen, ob das "output"-Element existiert (falls benötigt)
    if (body && target.closest("#iconCard")) {
      console.log("Warenkorb-Button geklickt!");

      // Dynamisch das div-Element mit der Klasse 'shopping_card' erstellen
      const shoppingCardDiv = document.createElement("div");
      shoppingCardDiv.classList.add("shopping_card");

      // Warenkorb-Inhalte generieren und in das div einfügen
      if (cart.length > 0) {
        cart.forEach(item => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("cart-item");

          itemDiv.innerHTML = `
            <div class="card_box">
              <div class="card_image">
                <img src="${item.image}" alt="${item.title}" />
              </div>
              <h4>${item.title}</h4>
              <p>Preis: €${item.price}</p>
              <p>Menge: ${item.quantity}</p>
              <button class="btnBackToShop" > Zurück zum Shop </button>;
          </div>
            `;

          shoppingCardDiv.appendChild(itemDiv);
        });
      } else {
        shoppingCardDiv.innerHTML = `<p class="empty_card" > Ihr Warenkorb ist leer.</p>`;
        // Füge den 'Zurück zum Shop' Button hinzu
        shoppingCardDiv.innerHTML += `<button class="btnBackToShop">Zurück zum Shop</button>`;
      }

      // Füge das neue 'shopping_card' div zum Body hinzu
      body.appendChild(shoppingCardDiv);

      console.log(cart); // Zeigt den aktuellen Warenkorb im Console

      // Event-Listener für den "Zurück zum Shop" Button
      const btnBackToShop = shoppingCardDiv.querySelector<HTMLButtonElement>(".btnBackToShop");
      if (btnBackToShop) {
        btnBackToShop.addEventListener("click", () => {
          shoppingCardDiv.style.display = "none";
          btnBackToShop.style.display = "none";

          console.log("Warenkorb geschlossen!");
        });
      }
    }
  });
}
