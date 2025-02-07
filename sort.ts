import { Product } from './main';

export function sortByName(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.title.localeCompare(b.title));
}

export function sortByPrice(products: Product[]): Product[] {
  return [...products].sort((a, b) => a.price - b.price);
}
