// Sample user data for demonstration purposes
const users = [
    { username: 'farmer1', password: 'password123' },
    { username: 'buyer1', password: 'password123' }
];

// Sample product data (you can fetch this from an API later)
const products = [
    { name: "Wheat", price: "$200/ton", img: "https://example.com/wheat.jpg" },
    { name: "Rice", price: "$150/ton", img: "https://example.com/rice.jpg" },
    { name: "Vegetables", price: "$50/ton", img: "https://example.com/vegetables.jpg" }
];

// Login functionality
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        alert('Login successful!');
        // Store the username in localStorage
        localStorage.setItem('username', username);
        // Redirect to profile page
        window.location.href = 'profile.html';
    } else {
        alert('Invalid username or password.');
    }
});

// Display the username on the profile page
function displayUsername() {
    const username = localStorage.getItem('username');
    if (username) {
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = username;
        }
    } else {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('username');
    window.location.href = 'login.html'; // Redirect to login
}

// Display products on the marketplace
function displayProducts() {
    const productList = document.querySelector('.product-list');
    if (productList) {
        productList.innerHTML = ''; // Clear existing products

        products.forEach(product => {
            const productCard = `
                <div class="product">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            `;
            productList.innerHTML += productCard; // Append product card
        });
    }
}

// Search function for products
function searchProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );

    // Display filtered products
    const productList = document.querySelector('.product-list');
    if (productList) {
        productList.innerHTML = ''; // Clear existing products

        filteredProducts.forEach(product => {
            const productCard = `
                <div class="product">
                    <img src="${product.img}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            `;
            productList.innerHTML += productCard; // Append product card
        });
    }
}

// Placeholder for AI Market Insights
function loadMarketInsights() {
    const insightsSection = document.querySelector('.insights');
    if (insightsSection) {
        insightsSection.innerHTML = '<p>Loading market insights...</p>';

        // Simulate fetching market insights
        setTimeout(() => {
            insightsSection.innerHTML = `
                <h3>Market Trends</h3>
                <p>Current wheat price trends indicate a stable market.</p>
                <p>Expected demand for rice is projected to increase by 15% this quarter.</p>
            `;
        }, 2000);
    }
}

// Initialize functions based on page
window.onload = function() {
    const path = window.location.pathname; // Get the current page URL path

    if (path.includes('login.html')) {
        // For login page, do not load products
    } else if (path.includes('profile.html')) {
        displayUsername(); // Show username in profile
    } else if (path.includes('marketplace.html')) {
        displayProducts(); // Show products in marketplace
        loadMarketInsights(); // Load insights if applicable
    }
};
