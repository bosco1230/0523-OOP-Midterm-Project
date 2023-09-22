// ProductItem.js
import { App } from "./app.js";
import { Product } from "./Product.js";

export class ProductItem extends Product {
  constructor(product) {
    super(product);
    this.quantity = 0; // Initialize quantity to 0
  }

  addToCart() {
    this.quantity++; // Increment the quantity
    App.addProductToCart(this);
  }

  removeFromCart() {
    if (this.quantity > 0) {
      this.quantity--; // Decrement the quantity, but prevent it from going negative
      App.removeProductFromCart(this);
    }
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
        <button class="remove-btn">-</button>
        <span class="quantity">${this.quantity}</span>
        <button class="add-btn">+</button>
      </div>
    </div>`;
    const addBtn = li.querySelector(".add-btn");
    const removeBtn = li.querySelector(".remove-btn");
    const quantitySpan = li.querySelector(".quantity"); // Get the quantity span
  
    addBtn.addEventListener("click", () => {
      this.addToCart();
      quantitySpan.textContent = `${this.quantity}`; // Update the quantity span when adding
    });
  
    removeBtn.addEventListener("click", () => {
      this.removeFromCart();
      quantitySpan.textContent = `${this.quantity}`; // Update the quantity span when removing
    });
  
    return li;
  }
}
