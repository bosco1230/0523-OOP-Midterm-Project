import { App } from "./app.js";
import { Product } from "./Product.js";

export class ProductItem extends Product {
  constructor(product) {
    super(product);
  }

  addToCart() {
    App.addProductToCart(this);
  }

  render() {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.innerHTML = `<div>
      <img
        src="${this.img}"
        alt="${this.title}"
      />
      <div class="product-item__content">
        <h2>${this.title}</h2>
        <h3>$${this.price}</h3>
        <p>${this.description}</p>
        <button>Add to Cart</button>
      </div>
    </div>`;
    const addBtn = li.querySelector("button");
    addBtn.addEventListener("click", this.addToCart.bind(this));
    return li;
  }
}