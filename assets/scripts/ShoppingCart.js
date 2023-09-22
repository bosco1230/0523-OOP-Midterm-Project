export class ShoppingCart {
    constructor() {
      this._items = [];
      this.cartCount = 0; // Initialize the cartCount property
    }
  
    addProduct(product) {
      this._items.push(product);
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
      
        // Update the cartCount property based on the number of items in the cart
        this.cartCount = this._items.length;
      
        // Update the cart count display with "items in cart"
        const cartCountBadge = document.getElementById("cartCountBadge");
        cartCountBadge.textContent = `${this.cartCount} item${this.cartCount !== 1 ? 's' : ''} in cart`;
      }
      
      render() {
        const section = document.createElement("section");
        section.classList.add("cart");
        section.innerHTML = `<h2>Total: <span id="totalCart">$${this.total}</span></h2>
          <button class="order-now-button">Order Now! <span id="cartCountBadge" class="badge">${this.cartCount} item${this.cartCount !== 1 ? 's' : ''} in cart</span></button>`;
        return section;
      }
      
  }