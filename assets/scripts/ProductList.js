import { ProductItem } from "./ProductItem.js";

export class ProductList {
  constructor() {
    this.products = [];
  }

  async fetchProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      this.products = data.map((productData) => new ProductItem(productData));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  async render() {
    await this.fetchProducts();
    const ul = document.createElement("ul");
    ul.classList.add("product-list");

    this.products.forEach((product) => {
      const productLi = product.render();
      ul.append(productLi);
    });
    return ul;
  }
}
