// ? zod importieren für die Validierung
import { z } from "zod";

// ? Import der ausgelagerten Sortier-Funktion
import { sortByName, sortByPrice } from "./sort";
import { renderProducts } from "./renderProducts";

// ? Exportieren des Objects "Produkt" für die sort.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

// ? Container für die Product-Cards
export const output = document.querySelector<HTMLDivElement>("#output");
// ? FilterButtons
export const filterButtons = document.querySelectorAll<HTMLButtonElement>(".filterBox button");

// ? Suchfeld
export const searchProduct = document.querySelector<HTMLInputElement>("#searchProduct");
// ? Dropdown für Sortieren
export const sortProduct = document.querySelector<HTMLSelectElement>("#SortProduct");

export const btnToCard = document.querySelectorAll<HTMLButtonElement>("#btnToCard");

export const cardCount = document.querySelector<HTMLSpanElement>("#cardCount");

// ? Leeres Array für den Warenkorb anlegen
let allProducts: Product[] = [];

// ? Artikel direkt bei Eingabe suchen
searchProduct?.addEventListener("input", () => {
    const searchText = searchProduct.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(searchText)
    );
    renderProducts(filteredProducts);
});

// ? Produkte laden
fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data: Product[]) => {
        allProducts = data;
        // ? hier wird für die Validierung geparst
        const schema = z.array(z.object({
            id: z.number(),
            title: z.string(),
            price: z.number(),
            category: z.string(),
            image: z.string()
        }));

        const parsedProducts = schema.parse(data);

        console.log(schema.parse(data));

        renderProducts(parsedProducts); // ? Alle Produkte initial anzeigen
    })
    .catch((error) => {
        console.log("Fehler beim Abholen der Daten. Fehlercode: ", error);
    });

// ? Event-Listener für Filter-Buttons
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.id.toLowerCase(); // Kategorien sind jetzt korrekt formatiert
        filterProducts(category);
    });
});

// ? Produkte filtern
function filterProducts(category: string) {
    if (category === "all") {
        renderProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter((product) =>
            product.category.toLowerCase() === category
        );
        renderProducts(filteredProducts);
    }
}

// ? Event-Listener für Sortieren
sortProduct?.addEventListener("change", () => {
    const sortOption = sortProduct.value;

    if (sortOption === "name") {
        const sortedProducts = sortByName(allProducts);
        renderProducts(sortedProducts);
    } else if (sortOption === "Preis") {
        const sortedProducts = sortByPrice(allProducts);
        renderProducts(sortedProducts);
    } else {
        renderProducts(allProducts);
    }
});

// ? Scroll-to-Top-Button
const headerStore = document.querySelector<HTMLDivElement>("#headerStore");
const toTopButton = document.querySelector<HTMLImageElement>("#toTop");

if (headerStore && toTopButton) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            toTopButton.classList.add("show");
            headerStore.classList.add("shadow");
        } else {
            toTopButton.classList.remove("show");
            headerStore.classList.remove("shadow");
        }
    });
}

// ? Ein/Ausklappen der Filter-Regeln
const filterArrow = document.querySelector<HTMLDivElement>("#filterArrow");
const filterContainer = document.querySelector<HTMLDivElement>("#filterContainer");
const arrowText = document.querySelector<HTMLSpanElement>("#arrowText");
const arrowDown = document.querySelector<HTMLSpanElement>("#arrowDown");
const searchSort = document.querySelector<HTMLDivElement>("#search_sort");
const headerStoreOverlay = document.querySelector<HTMLDivElement>(".header_store_overlay");

if (arrowText && arrowDown && filterArrow && searchSort && filterContainer && headerStoreOverlay) {
    filterArrow.addEventListener("click", () => {
        console.log("ich wurde geklickt");

        // ? Toggle die Klasse "show" für den FilterContainer

        filterContainer.classList.toggle("show");
        arrowText.classList.toggle("hide");
        arrowDown.classList.toggle("rotate");
        headerStoreOverlay.classList.toggle("full_height");
    });
}
