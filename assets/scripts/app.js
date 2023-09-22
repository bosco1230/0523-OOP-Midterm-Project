import { Shop } from "./Shop.js";

export class App {
  static async init() {
    this.shop = new Shop();
    await this.shop.render();
  }

  static addProductToCart(product) {
    this.shop.cart.addProduct(product);
  }
  static removeProductFromCart(product) {
    this.shop.cart.removeProduct(product);
  }
}

App.init();