import { Shop } from "./Shop.js";

export class App {
  static async init() {
    this.shop = new Shop();
    await this.shop.render();
  }

  static addProductToCart(product) {
    this.shop.cart.addProduct(product);
  }
}

App.init();