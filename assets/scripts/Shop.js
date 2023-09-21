import { ProductList } from "./ProductList.js";
import { ShoppingCart } from "./ShoppingCart.js";

export class Shop {
  async render() {
    this.cart = new ShoppingCart();
    this.products = new ProductList();
    const section = this.cart.render();
    const ul = await this.products.render();
    const app = document.getElementById("app");
    app.append(section, ul);
  }
}