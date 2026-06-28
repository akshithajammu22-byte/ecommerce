// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Headphones",
        category: "Electronics",
        price: 79.99,
        image: "https://via.placeholder.com/250x200?text=Wireless+Headphones",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 2,
        title: "Smartphone Case",
        category: "Electronics",
        price: 19.99,
        image: "https://via.placeholder.com/250x200?text=Smartphone+Case",
        description: "Durable and stylish smartphone case"
    },
    {
        id: 3,
        title: "T-Shirt",
        category: "Fashion",
        price: 24.99,
        image: "https://via.placeholder.com/250x200?text=T-Shirt",
        description: "Comfortable cotton t-shirt available in multiple colors"
    },
    {
        id: 4,
        title: "Running Shoes",
        category: "Fashion",
        price: 89.99,
        image: "https://via.placeholder.com/250x200?text=Running+Shoes",
        description: "Professional running shoes with cushioning technology"
    },
    {
        id: 5,
        title: "Coffee Maker",
        category: "Home",
        price: 49.99,
        image: "https://via.placeholder.com/250x200?text=Coffee+Maker",
        description: "Automatic coffee maker with programmable timer"
    },
    {
        id: 6,
        title: "Desk Lamp",
        category: "Home",
        price: 34.99,
        image: "https://via.placeholder.com/250x200?text=Desk+Lamp",
        description: "LED desk lamp with adjustable brightness"
    },
    {
        id: 7,
        title: "JavaScript Guide",
        category: "Books",
        price: 29.99,
        image: "https://via.placeholder.com/250x200?text=JavaScript+Guide",
        description: "Comprehensive guide to modern JavaScript programming"
    },
    {
        id: 8,
        title: "Python Basics",
        category: "Books",
        price: 25.99,
        image: "https://via.placeholder.com/250x200?text=Python+Basics",
        description: "Learn Python programming from scratch"
    },
    {
        id: 9,
        title: "Portable Charger",
        category: "Electronics",
        price: 39.99,
        image: "https://via.placeholder.com/250x200?text=Portable+Charger",
        description: "Fast charging power bank for all devices"
    },
    {
        id: 10,
        title: "Jeans",
        category: "Fashion",
        price: 59.99,
        image: "https://via.placeholder.com/250x200?text=Jeans",
        description: "Classic blue jeans for everyday wear"
    },
    {
        id: 11,
        title: "Bedsheet Set",
        category: "Home",
        price: 44.99,
        image: "https://via.placeholder.com/250x200?text=Bedsheet+Set",
        description: "Soft and comfortable 100% cotton bedsheet set"
    },
    {
        id: 12,
        title: "Web Design Book",
        category: "Books",
        price: 35.99,
        image: "https://via.placeholder.com/250x200?text=Web+Design+Book",
        description: "Master the art of modern web design"
    }
];

// Cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Modal data
let currentProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartCount();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');

    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
}

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-view" onclick="openModal(${product.id})">View</button>
                    <button class="btn-add" onclick="addToCart(${product.id}, 1)">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filtered = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchInput) || 
                            product.description.toLowerCase().includes(searchInput);
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

// Open product modal
function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    
    if (currentProduct) {
        document.getElementById('modal-image').src = currentProduct.image;
        document.getElementById('modal-title').textContent = currentProduct.title;
        document.getElementById('modal-description').textContent = currentProduct.description;
        document.getElementById('modal-price').textContent = currentProduct.price.toFixed(2);
        document.getElementById('modal-quantity').value = 1;
        
        document.getElementById('product-modal').classList.add('show');
    }
}

// Close modal
function closeModal() {
    document.getElementById('product-modal').classList.remove('show');
    currentProduct = null;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add to cart from modal
function addToCartFromModal() {
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('modal-quantity').value) || 1;
        addToCart(currentProduct.id, quantity);
        closeModal();
    }
}

// Add to cart
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.title} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

// Update cart quantity
function updateCartItemQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, -1)">−</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
    updateCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully! Total: $${total.toFixed(2)}\n\nThank you for shopping with ShopHub!`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCart();
    toggleCart();
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);