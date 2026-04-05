// ============================================
// Restaurant Order Management System
// ============================================

class MenuItem {
  // Static property: tracks total menu items created
  static totalItems = 0;

  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.available = true;
    MenuItem.totalItems++;
  }

  // Returns a formatted string describing the menu item
  getDetails() {
    const status = this.available ? "Available" : "Unavailable";
    return `${this.name} (${this.category}) - $${this.price.toFixed(2)} [${status}]`;
  }

  // Toggles whether the item is available for ordering
  toggleAvailability() {
    this.available = !this.available;
    console.log(`"${this.name}" is now ${this.available ? "available" : "unavailable"}.`);
  }

  // Static method: returns the total number of menu items created
  static getTotalItems() {
    return MenuItem.totalItems;
  }
}

class Order {
  // Static properties
  static orderCount = 0;
  static taxRate = 0.1; // 10% tax

  constructor(customerName) {
    Order.orderCount++;
    this.orderId = Order.orderCount;
    this.customerName = customerName;
    this.items = [];
    this.status = "pending";
  }

  // Adds a menu item to the order if it is available
  addItem(item) {
    if (!item.available) {
      console.log(`Sorry, "${item.name}" is currently unavailable.`);
      return;
    }
    this.items.push(item);
    console.log(`Added "${item.name}" to Order #${this.orderId}.`);
  }

  // Removes the first matching item by name
  removeItem(itemName) {
    const index = this.items.findIndex((item) => item.name === itemName);
    if (index === -1) {
      console.log(`"${itemName}" not found in Order #${this.orderId}.`);
      return;
    }
    this.items.splice(index, 1);
    console.log(`Removed "${itemName}" from Order #${this.orderId}.`);
  }

  // Calculates the subtotal before tax
  calculateSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  // Calculates the total including tax
  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    return subtotal + subtotal * Order.taxRate;
  }

  // Returns a full summary of the order
  getOrderSummary() {
    const itemLines = this.items.map((item) => `  - ${item.getDetails()}`).join("\n");
    const subtotal = this.calculateSubtotal();
    const total = this.calculateTotal();

    return [
      `===== Order #${this.orderId} =====`,
      `Customer: ${this.customerName}`,
      `Status:   ${this.status}`,
      `Items:`,
      itemLines || "  (none)",
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Tax (${(Order.taxRate * 100).toFixed(0)}%): $${(total - subtotal).toFixed(2)}`,
      `Total:    $${total.toFixed(2)}`,
      `============================`,
    ].join("\n");
  }

  // Static method: returns total orders placed
  static getOrderCount() {
    return Order.orderCount;
  }

  // Static method: updates the tax rate for all orders
  static setTaxRate(rate) {
    Order.taxRate = rate;
    console.log(`Tax rate updated to ${(rate * 100).toFixed(0)}%.`);
  }
}

// ============================================
// Usage Examples
// ============================================

console.log("--- Creating Menu Items ---");
const burger = new MenuItem("Classic Burger", 12.99, "Main");
const fries = new MenuItem("French Fries", 4.99, "Side");
const soda = new MenuItem("Soda", 2.49, "Drink");
const salad = new MenuItem("Caesar Salad", 8.99, "Starter");

console.log(burger.getDetails());
console.log(fries.getDetails());
console.log(soda.getDetails());
console.log(salad.getDetails());
console.log(`Total menu items created: ${MenuItem.getTotalItems()}`);

console.log("\n--- Toggling Availability ---");
salad.toggleAvailability(); // mark salad as unavailable

console.log("\n--- Placing Order #1 ---");
const order1 = new Order("Alice");
order1.addItem(burger);
order1.addItem(fries);
order1.addItem(soda);
order1.addItem(salad); // should fail — unavailable
console.log(order1.getOrderSummary());

console.log("\n--- Placing Order #2 ---");
const order2 = new Order("Bob");
order2.addItem(burger);
order2.addItem(burger);
order2.removeItem("Classic Burger"); // removes one burger
console.log(order2.getOrderSummary());

console.log("\n--- Updating Tax Rate ---");
Order.setTaxRate(0.15); // change to 15%
console.log(order1.getOrderSummary()); // recalculated with new rate

console.log(`\nTotal orders placed: ${Order.getOrderCount()}`);
