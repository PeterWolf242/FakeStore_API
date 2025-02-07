import { Product } from './main';
import { output } from './main';
import { card } from './card';

// ? Funktion zum Rendern der Produkte
export function renderProducts(products: Product[]) {
  if (output) {
    // ? Alte Produkte entfernen
    output.innerHTML = "";
    products.forEach((product) => {
      if (output) {
        const newCard = document.createElement("div")
        newCard.innerHTML
        output.innerHTML += `
                <div class="product_box" data-id="${product.id}" data-price="${product.price}">
                    <div class="img_box">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product_info">
                        <p>${product.title}</p>
                        <p class="category">Kategorie: <span id="categoryName">${product.category}</span></p>
                        <div class="price_card">
                            <p class="price">${product.price.toFixed(2)} €</p>
                            <div class="quantity_card_area">
                              <div class="quantity_input_area">
                                <label for="product-${product.id}-quantityInput">Menge: </label>
                                <input type="text" id="product-${product.id}-quantityInput" class="quantity_input" value="1">
                              </div>
                              <button type="button" id="btnToCard">In den Warenkorb</button>
                            </div>
                        </div>
                    </div>
                </div>`;
      }
    });
    card();
  }
}
