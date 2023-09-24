import { App } from "./app.js";
import { Product } from "./Product.js";

export class ProductItem extends Product {
  constructor(product) {
    super(product);
    this.quantity = 0;
  }

  addToCart() {
    this.quantity++; 
    App.addProductToCart(this);
    this.updateMainQuantity(); 
  }

  removeFromCart() {
    if (this.quantity > 0) {
      this.quantity--; 
        App.removeProductFromCart(this);
      this.updateMainQuantity(); 
    }
  }

  showProductPopup(productId) {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("product-popup");

    popupContainer.innerHTML = `
      <div class="popup-content">
        <div>
          <img src="${this.img}" alt="${this.title}" />
        </div>
        <div class="product-item__popup">
          <div class="title-container">
            <h2 class="popup-title">${this.title}</h2>
          </div>
          <h3>$${this.price}</h3>
          <div class="description-container-popup">
            <p class="description">${this.description}</p>
          </div>
          <button class="remove-btn">-</button>
          <span class="quantity">${this.quantity}</span>
          <button class="add-btn">+</button>
          <button class="close-popup">Close</button>
        </div>
      </div>
    `;

    const closePopupBtn = popupContainer.querySelector(".close-popup");
    closePopupBtn.addEventListener("click", () => {
      document.body.removeChild(popupContainer);
    });

    const addPopupBtn = popupContainer.querySelector(".add-btn");
    addPopupBtn.addEventListener("click", () => {
      this.addToCart();
      const quantitySpan = popupContainer.querySelector(".quantity");
      quantitySpan.textContent = `${this.quantity}`;
      this.updateMainQuantity(); 
    });

    const removePopupBtn = popupContainer.querySelector(".remove-btn");
    removePopupBtn.addEventListener("click", () => {
      this.removeFromCart();
      const quantitySpan = popupContainer.querySelector(".quantity");
      quantitySpan.textContent = `${this.quantity}`;
      this.updateMainQuantity(); 
    });

    document.body.appendChild(popupContainer);
  }

  updateMainQuantity() {
    const mainProductLi = document.querySelector(`.product-item[data-product-id="${this.id}"]`);
    if (mainProductLi) {
      const mainQuantitySpan = mainProductLi.querySelector(".quantity");
      mainQuantitySpan.textContent = `${this.quantity}`;
    }
  }

  render() {
    const li = document.createElement("li");
    li.classList.add("product-item");
    li.setAttribute("data-product-id", this.id); 

    li.innerHTML = `<div>
      <img src="${this.img}" alt="${this.title}" />
      <div class="product-item__content">
        <div class="title-container">
          <h2 class="title">${this.title}</h2>
        </div>
        <h3>$${this.price}</h3>
        <div class="description-container">
          <p class="description">${this.description}</p>
        </div>
        <button class="remove-btn">-</button>
        <span class="quantity">${this.quantity}</span>
        <button class="add-btn">+</button>
        <button class="show-popup">More Details</button>
      </div>
    </div>`;

    const addBtn = li.querySelector(".add-btn");
    const removeBtn = li.querySelector(".remove-btn");
    const showPopupBtn = li.querySelector(".show-popup");

    showPopupBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showProductPopup(this.id);
    });

    addBtn.addEventListener("click", () => {
      this.addToCart();
    });

    removeBtn.addEventListener("click", () => {
      this.removeFromCart();
    });

    return li;
  }
}
