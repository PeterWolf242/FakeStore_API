import { cardCount } from "./main";
import { shoppingcard } from "./shoppingCard";

shoppingcard();

// ? Warenkorb-Array
interface CartItem {
  image: string;
  title: string;
  price: number;
  quantity: number;
}

// ? Leeres Array für den Warenkorb
export let cart: CartItem[] = [];

let cardNumber: number = 0;
// console.clear();

// ? Funktion zum Hinzufügen von Produkten in den Warenkorb
export function card() {
  const buttons = document.querySelectorAll<HTMLButtonElement>("#btnToCard");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // ? Das nächste "product_box"-Elternelement des Buttons finden
      const target = event.target as HTMLButtonElement;
      const productBox = target.closest(".product_box");

      if (productBox && cardCount) {
        // ? Produktdaten extrahieren
        const image = (productBox.querySelector("img") as HTMLImageElement).src;
        const title = (productBox.querySelector("p") as HTMLParagraphElement).innerText;
        const price = parseFloat(productBox.getAttribute("data-price") || "0");

        // ? Menge abrufen (Standard: 1)
        const quantityInput = productBox.querySelector<HTMLInputElement>(".quantity_input");
        const quantityValue = quantityInput ? Number(quantityInput.value) : 1;

        // ? Neues Produkt dem Warenkorb hinzufügen
        const item: CartItem = { image, title, price, quantity: quantityValue };

        let isAlreadyInCard: boolean = false;
        cart.forEach(element => {
          if (item.title == element.title) {
            isAlreadyInCard = true;
            console.log("Artikel ist schon im Warenkorb vorhanden !!!!!!!!!!!!");
            cardNumber = cardNumber;

            element.quantity++;
            console.log("menge gleicher Artikel im Warenkorb: ", element.quantity);

            const quantityFromCard = element.quantity;

            console.log("Anzahl der gleichen Produkte im Warenkorb: ", element.quantity);
          }
        });
        if (!isAlreadyInCard) cart.push(item);
        const cardQuantity = cart.length.toLocaleString();

        // ? Anzahl der Produkte nebem dem Warenkorb-Symbol anzeigen

        if (cardCount) {
          if (cart.length == 0) {
            cardCount.style.display = "none";
          }
          else {
            cardCount.style.display = "inline-block";
            // ? Ausgabe der Produkte im Warenkorb
            cardCount.innerText = cardQuantity;
            cardNumber++;

            // ? Animation entfernen und nach einem Frame wieder hinzufügen**
            cardCount.classList.remove("animateCount");
            requestAnimationFrame(() => {
              setTimeout(() => {
                cardCount?.classList.add("animateCount");
              }, 10);
            });

            console.log("Anzahl Produkte im Warenkorb: ", cardQuantity);
            console.log("Zählvariable für den Warenkorb: ", cardNumber);
          }
        }

        console.log("Aktueller Warenkorb:", cart);
        return cart;
      } else {
        console.log("❌ Fehler: Produkt-Container nicht gefunden!");
      }

      // document.addEventListener("DOMContentLoaded", () => {
      //   console.log("📢 DOM ist vollständig geladen!");

      //   const iconCard = document.querySelector<HTMLDivElement>("#iconCard");
      //   console.log("🎯 Gefundenes Element:", iconCard);

      //   if (iconCard) {
      //     iconCard.addEventListener("click", () => {
      //       console.log("✅ Warenkorb-Button geklickt!");
      //     });
      //   } else {
      //     console.log("❌ Fehler: Element #iconCard wurde nicht gefunden!");
      //   }
      // });


    });
  });
};


// document.addEventListener("click", (event) => {
//   const target = event.target as HTMLElement;

//   if (target.closest("#iconCard")) {
//     console.log("✅ Warenkorb-Button geklickt!");

//     console.log(cart);
//   }
// });
