// Sample menu items
const menuItems = [
    { id: 1, name: "Pizza Margherita", category: "Pizza", price: 10.99 },
    { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 12.99 },
    { id: 3, name: "Cheeseburger", category: "Burgers", price: 8.99 },
    { id: 4, name: "Veggie Burger", category: "Burgers", price: 9.99 },
    { id: 5, name: "Sushi Platter", category: "Sushi", price: 15.99 },
    { id: 6, name: "California Roll", category: "Sushi", price: 13.99 },
    { id: 7, name: "Caesar Salad", category: "Salads", price: 7.99 },
    { id: 8, name: "Greek Salad", category: "Salads", price: 8.99 }
];

// Shopping Cart
let cart = [];

// Function to display the menu
function displayMenu(menu = menuItems) {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = ""; // Clear existing items
    menu.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("category-item");
        itemDiv.innerHTML = `
            <img src="https://via.placeholder.com/200" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.category} - $${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        categoryList.appendChild(itemDiv);
    });
}

// Function to filter menu items based on search input
function filterMenu() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredMenu = menuItems.filter(item => item.name.toLowerCase().includes(query));
    displayMenu(filteredMenu);
}

// Function to add items to the cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    cart.push(item);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById("cartItems");
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
        `).join('');
    }
}

// Function to simulate order placement
function placeOrder() {
    if (cart.length === 0) {
        alert("Please add items to your cart before placing an order.");
        return;
    }
    alert("Your order has been placed successfully!");
    cart = []; // Clear the cart
    updateCartDisplay();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    alert(`Total amount: $${total.toFixed(2)}. Your order is being processed.`);
    cart = []; // Clear cart after checkout
    updateCartDisplay();
}

// Initial display of the full menu
displayMenu();
