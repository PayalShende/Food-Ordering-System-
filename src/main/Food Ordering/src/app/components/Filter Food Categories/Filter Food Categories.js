// menu.js
document.getElementById('category-filter').addEventListener('change', function() {
    const category = this.value;
    fetchMenuItems(category);
});

function fetchMenuItems(category) {
    fetch(`/api/menu?category=${category}`)
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-items');
            menuContainer.innerHTML = '';
            data.items.forEach(item => {
                menuContainer.innerHTML += `
                    <div class="menu-item">
                        <img src="${item.image}" alt="${item.name}" />
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>$${item.price}</p>
                    </div>
                `;
            });
        });
}

// Load all menu items on page load
fetchMenuItems('all');
app.get('/api/menu', async (req, res) => {
    const category = req.query.category || 'all';
    const menuItems = await MenuItem.find(category === 'all' ? {} : { category });
    res.json({ items: menuItems });
});
let cart = [];

function addToCart(itemId) {
    cart.push(itemId);
    updateCartDisplay();
}

function updateCartDisplay() {
    document.getElementById('cart-count').innerText = cart.length;
}
