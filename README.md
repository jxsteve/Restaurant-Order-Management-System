# Restaurant Order Management System

## Problem Domain Description

The **Restaurant Order Management System** is a software solution that allows restaurant staff to manage menu items and process customer orders efficiently. It solves the problem of tracking what dishes are available, calculating order totals, applying discounts, and monitoring how many orders have been placed. Restaurant managers, waitstaff, and cashiers use this system daily to streamline operations.

## UML Class Diagram

![UML Class Diagram](./class-diagram.svg)

### Class Diagram (PlantUML Source)

```plantuml
@startuml
class MenuItem {
  - name: string
  - price: number
  - category: string
  - available: boolean
  {static} - totalItems: number
  + constructor(name: string, price: number, category: string)
  + getDetails(): string
  + toggleAvailability(): void
  {static} + getTotalItems(): number
}

class Order {
  - orderId: number
  - items: MenuItem[]
  - customerName: string
  - status: string
  {static} - orderCount: number
  {static} - taxRate: number
  + constructor(customerName: string)
  + addItem(item: MenuItem): void
  + removeItem(itemName: string): void
  + calculateSubtotal(): number
  + calculateTotal(): number
  + getOrderSummary(): string
  {static} + getOrderCount(): number
  {static} + setTaxRate(rate: number): void
}

Order "1" --> "*" MenuItem : contains
@enduml
```

## Code Implementation

See [`src/index.js`](./src/index.js) for the full implementation with usage examples.

## How to Run

```bash
node src/index.js
```
