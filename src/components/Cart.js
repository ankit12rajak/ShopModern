// Cart component for e-commerce website

import { updateCartCount } from './ProductCard.js';

// Cart state
let cart = [];
let isCartOpen = false;

// Initialize cart from localStorage
function initCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCartCount();
  renderMiniCart();
}

// Create cart component
function createCart() {
  const cartContainer = document.createElement('div');
  cartContainer.className = 'cart-container';
  
  cartContainer.innerHTML = `
    <div class="cart-overlay"></div>
    <div class="cart-sidebar">
      <div class="cart-header">
        <h3>Your Cart</h3>
        <button class="close-cart">
          <i class='bx bx-x'></i>
        </button>
      </div>
      <div class="cart-items">
        <!-- Cart items will be rendered here -->
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <span>Total:</span>
          <span class="total-amount">$0.00</span>
        </div>
        <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
        <button class="btn btn-outline view-cart-btn">View Cart</button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const overlay = cartContainer.querySelector('.cart-overlay');
  const closeBtn = cartContainer.querySelector('.close-cart');
  const checkoutBtn = cartContainer.querySelector('.checkout-btn');
  const viewCartBtn = cartContainer.querySelector('.view-cart-btn');
  
  overlay.addEventListener('click', toggleCart);
  closeBtn.addEventListener('click', toggleCart);
  checkoutBtn.addEventListener('click', handleCheckout);
  viewCartBtn.addEventListener('click', navigateToCart);
  
  document.body.appendChild(cartContainer);
  
  return cartContainer;
}

// Toggle cart visibility
function toggleCart() {
  const cartContainer = document.querySelector('.cart-container');
  isCartOpen = !isCartOpen;
  
  if (isCartOpen) {
    cartContainer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when cart is open
    renderCartItems();
  } else {
    cartContainer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Render cart items
function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  if (!cartItemsContainer) return;
  
  // Clear current items
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class='bx bx-cart'></i>
        <p>Your cart is empty</p>
        <a href="#products" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }
  
  // Add cart items
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h4 class="cart-item-name">${item.name}</h4>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="remove-item" data-id="${item.id}">
        <i class='bx bx-trash'></i>
      </button>
    `;
    
    cartItemsContainer.appendChild(cartItem);
  });
  
  // Add event listeners to quantity buttons and remove buttons
  const decreaseBtns = document.querySelectorAll('.decrease');
  const increaseBtns = document.querySelectorAll('.increase');
  const removeBtns = document.querySelectorAll('.remove-item');
  
  decreaseBtns.forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
  });
  
  increaseBtns.forEach(btn => {
    btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
  });
  
  removeBtns.forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
  
  // Update cart total
  updateCartTotal();
}

// Update item quantity
function updateQuantity(id, change) {
  const item = cart.find(item => item.id == id);
  if (!item) return;
  
  item.quantity += change;
  
  // Remove item if quantity is 0
  if (item.quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  // Update localStorage and UI
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id != id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
  
  // Show success message
  showNotification('Item removed from cart');
}

// Update cart total
function updateCartTotal() {
  const totalAmount = document.querySelector('.total-amount');
  if (!totalAmount) return;
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Handle checkout process
function handleCheckout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty');
    return;
  }
  
  // In a real app, this would redirect to a checkout page
  // For demo purposes, we'll just show a success message
  showNotification('Redirecting to checkout...');
  setTimeout(() => {
    window.location.href = '#checkout';
  }, 1000);
}

// Navigate to cart page
function navigateToCart() {
  // In a real app, this would navigate to a full cart page
  // For demo purposes, we'll just close the mini cart
  toggleCart();
  showNotification('Navigating to full cart...');
}

// Render mini cart dropdown
function renderMiniCart() {
  const cartDropdown = document.querySelector('.cart-dropdown');
  if (!cartDropdown) return;
  
  const cartItemsContainer = cartDropdown.querySelector('.cart-items');
  const totalAmount = cartDropdown.querySelector('.total-amount');
  
  // Clear current items
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-message">Your cart is empty</p>`;
    totalAmount.textContent = '$0.00';
    return;
  }
  
  // Add up to 3 cart items (for mini cart)
  const itemsToShow = cart.slice(0, 3);
  
  itemsToShow.forEach(item => {
    const miniCartItem = document.createElement('div');
    miniCartItem.className = 'mini-cart-item';
    miniCartItem.innerHTML = `
      <div class="mini-cart-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="mini-cart-details">
        <h4 class="mini-cart-name">${item.name}</h4>
        <div class="mini-cart-price">${item.quantity} x $${item.price.toFixed(2)}</div>
      </div>
      <button class="remove-mini-item" data-id="${item.id}">
        <i class='bx bx-x'></i>
      </button>
    `;
    
    cartItemsContainer.appendChild(miniCartItem);
  });
  
  // Show "more items" message if needed
  if (cart.length > 3) {
    const moreItems = document.createElement('div');
    moreItems.className = 'more-items';
    moreItems.textContent = `+ ${cart.length - 3} more item(s)`;
    cartItemsContainer.appendChild(moreItems);
  }
  
  // Add event listeners to remove buttons
  const removeBtns = cartDropdown.querySelectorAll('.remove-mini-item');
  removeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent dropdown from closing
      removeFromCart(btn.dataset.id);
    });
  });
  
  // Update cart total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Add product to cart
function addToCart(product, quantity = 1) {
  // Get current cart
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if product already exists in cart
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity
    });
  }
  
  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Update UI
  updateCartCount();
  renderMiniCart();
  
  // Show success message
  showNotification(`${product.name} added to cart!`);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class='bx bx-check-circle'></i>
      <p>${message}</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  createCart();
  
  // Add event listener to cart icon in header
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', toggleCart);
  }
});

export {
  addToCart,
  removeFromCart,
  toggleCart,
  updateQuantity
}; 