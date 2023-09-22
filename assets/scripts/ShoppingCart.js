export class ShoppingCart {
    constructor() {
      this._items = [];
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
    }
  
    render() {
        const section = document.createElement("section");
        section.classList.add("cart");
        section.innerHTML = `<h2>Total: <span id="totalCart">$${this.total}</span></h2>
            <button>Order Now!</button>`;
        return section;
    }
  }