export class ShoppingCart {
    constructor() {
      this._items = [];
      this.cartCount = 0; 
    }
  
    addProduct(product) {
      this._items.push(product);
      this.updateTotal();
    }
    clearCart() {
      this._items = [];
      this.updateTotal();
    }
    removeProduct(product) {
      const index = this._items.indexOf(product);
      if (index !== -1) {
        this._items.splice(index, 1);
        this.updateTotal();
      }
    }
  
    set items(updatedItems) {
      this._items = [...updatedItems];
      this.updateTotal();
    }
  
    get total() {
      return this._items.reduce((accumulator, product) => {
        return accumulator + product.price;
      }, 0);
    }
  
    updateTotal() {
        const spanTotal = document.getElementById("totalCart");
        spanTotal.textContent = `$${this.total}`;
      
        this.cartCount = this._items.length;
      
        const cartCountBadge = document.getElementById("cartCountBadge");
        cartCountBadge.textContent = `${this.cartCount} item${this.cartCount !== 1 ? 's' : ''} in cart`;
      }
      
      render() {
        const section = document.createElement("section");
        section.classList.add("cart");
        section.innerHTML = `
          <h2>Total: <span id="totalCart">$${this.total}</span></h2>
          <button class="order-now-button" id="orderNowBtn">Order Now! 
            <span id="cartCountBadge" class="badge">${this.cartCount} item${this.cartCount !== 1 ? 's' : ''} in cart</span>
          </button>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close" id="closeModal">&times;</span>
              <h3>Order Form</h3>
              <form id="myForm">
              <input type="text" placeholder="Name" required>
              <input type="email" placeholder="Email" required>
              <input type="tel" placeholder="Phone Number" required>
              <input type="text" placeholder="Address" required>
              <input type="text" placeholder="Postal Code" required>              
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div id="errorModal" class="modal">
            <div class="modal-content">
              <span class="close" id="closeErrorModal">&times;</span>
              <h3>Error</h3>
              <p>Your cart is empty. Add items to the cart before placing an order.</p>
            </div>
          </div>
          <div id="successModal" class="modal">
          <div class="modal-content">
            <span class="close" id="closeSuccessModal">&times;</span>
            <h3>Order Submitted</h3>
            <p>You'll receive the package in ${getRandomNumber(7, 13)}-${getRandomNumber(14, 30)} days.</p>
          </div>
        </div>
        `;
    
        const orderNowBtn = section.querySelector("#orderNowBtn");
        const modal = section.querySelector("#myModal");
        const closeModal = section.querySelector("#closeModal");
        const errorModal = section.querySelector("#errorModal");
        const closeErrorModal = section.querySelector("#closeErrorModal");
        const successModal = section.querySelector("#successModal");
        const closeSuccessModal = section.querySelector("#closeSuccessModal");
        const myForm = section.querySelector("#myForm");
   
        myForm.addEventListener("submit", (event) => {
          event.preventDefault(); 
    
          if (this.cartCount === 0) {
            errorModal.style.display = "block";
          } else {
            this.clearCart(); 
            successModal.style.display = "block";
            modal.style.display = "none"; 
          }
        });
    
    
        closeSuccessModal.addEventListener("click", () => {
          successModal.style.display = "none"; 
        });
        orderNowBtn.addEventListener("click", () => {
          if (this.cartCount === 0) {
            errorModal.style.display = "block"; 
          } else {
            modal.style.display = "block"; 
          }
        });
    
        closeModal.addEventListener("click", () => {
          modal.style.display = "none"; 
        });
    
        closeErrorModal.addEventListener("click", () => {
          errorModal.style.display = "none"; 
        });
    
        window.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.style.display = "none"; 
          }
          if (event.target === errorModal) {
            errorModal.style.display = "none";
          }
        });
    
        return section;
      }
      
  }
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }