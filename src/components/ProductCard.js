// ProductCard component for e-commerce website

import { addToCartAnimation } from '../utils/animations.js';

// Create a product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.setAttribute('data-aos', 'fade-up');
  
  const imageUrl = product.image || 'https://via.placeholder.com/300x200';
  
  card.innerHTML = `
    <div class="product-badge ${product.isNew ? 'new-badge' : ''} ${product.discount ? 'sale-badge' : ''}">
      ${product.isNew ? 'New' : product.discount ? `${product.discount}% OFF` : ''}
    </div>
    <div class="product-image-container">
      <img src="${imageUrl}" alt="${product.name}" class="product-image">
      <div class="product-actions">
        <button class="action-btn wishlist-btn" title="Add to Wishlist">
          <i class='bx bx-heart'></i>
        </button>
        <button class="action-btn quick-view-btn" title="Quick View">
          <i class='bx bx-search'></i>
        </button>
        <button class="action-btn compare-btn" title="Compare">
          <i class='bx bx-transfer'></i>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div class="product-category">${product.category || 'Uncategorized'}</div>
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        ${generateRatingStars(product.rating || 0)}
        <span class="rating-count">(${product.reviewCount || 0})</span>
      </div>
      <div class="product-price-container">
        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
        <span class="product-price">$${product.price.toFixed(2)}</span>
      </div>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
  
  // Add event listeners
  const addToCartBtn = card.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleAddToCart(product, addToCartBtn);
  });
  
  const wishlistBtn = card.querySelector('.wishlist-btn');
  wishlistBtn.addEventListener('click', () => {
    toggleWishlist(product.id, wishlistBtn);
  });
  
  const quickViewBtn = card.querySelector('.quick-view-btn');
  quickViewBtn.addEventListener('click', () => {
    openQuickView(product);
  });
  
  return card;
}

// Generate rating stars based on rating value
function generateRatingStars(rating) {
  let starsHtml = '';
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHtml += '<i class="bx bxs-star"></i>';
    } else if (i === fullStars + 1 && hasHalfStar) {
      starsHtml += '<i class="bx bxs-star-half"></i>';
    } else {
      starsHtml += '<i class="bx bx-star"></i>';
    }
  }
  
  return starsHtml;
}

// Handle adding a product to cart
function handleAddToCart(product, button) {
  // Animate the button
  button.classList.add('add-to-cart-animation');
  
  // Use GSAP animation if available
  if (typeof addToCartAnimation === 'function') {
    addToCartAnimation(button);
  }
  
  // Remove animation class after it completes
  setTimeout(() => {
    button.classList.remove('add-to-cart-animation');
  }, 500);
  
  // Add to cart logic
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  // Show success message
  showNotification(`${product.name} has been added to your cart!`);
}

// Update the cart count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add bounce animation
    cartCount.classList.add('bounce');
    setTimeout(() => {
      cartCount.classList.remove('bounce');
    }, 1000);
  }
}

// Toggle wishlist for a product
function toggleWishlist(productId, button) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const index = wishlist.indexOf(productId);
  
  if (index === -1) {
    wishlist.push(productId);
    button.innerHTML = '<i class="bx bxs-heart"></i>';
    button.classList.add('active');
    showNotification('Product added to your wishlist!');
  } else {
    wishlist.splice(index, 1);
    button.innerHTML = '<i class="bx bx-heart"></i>';
    button.classList.remove('active');
    showNotification('Product removed from your wishlist!');
  }
  
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Open quick view modal
function openQuickView(product) {
  const modal = document.createElement('div');
  modal.className = 'quick-view-modal';
  
  modal.innerHTML = `
    <div class="quick-view-content">
      <button class="close-modal"><i class='bx bx-x'></i></button>
      <div class="quick-view-grid">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-details">
          <h2 class="product-name">${product.name}</h2>
          <div class="product-rating">
            ${generateRatingStars(product.rating || 0)}
            <span class="rating-count">(${product.reviewCount || 0} reviews)</span>
          </div>
          <div class="product-price-container">
            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
            <span class="product-price">$${product.price.toFixed(2)}</span>
          </div>
          <div class="product-description">
            ${product.description || 'No description available.'}
          </div>
          <div class="product-actions">
            <div class="quantity-selector">
              <button class="quantity-btn minus">-</button>
              <input type="number" value="1" min="1" class="quantity-input">
              <button class="quantity-btn plus">+</button>
            </div>
            <button class="add-to-cart">Add to Cart</button>
          </div>
          <div class="product-meta">
            <p>Category: <span>${product.category || 'Uncategorized'}</span></p>
            <p>SKU: <span>${product.sku || 'N/A'}</span></p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // Quantity buttons
  const quantityInput = modal.querySelector('.quantity-input');
  const minusBtn = modal.querySelector('.minus');
  const plusBtn = modal.querySelector('.plus');
  
  minusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
  
  plusBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
  
  // Add to cart button
  const addToCartBtn = modal.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCartWithQuantity(product, quantity);
    document.body.removeChild(modal);
  });
  
  // Animate modal entrance
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

// Add to cart with specific quantity
function addToCartWithQuantity(product, quantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  
  showNotification(`${quantity} x ${product.name} added to your cart!`);
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

// Render a list of product cards in a container
function renderProductCards(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Add products
  products.forEach(product => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

export {
  createProductCard,
  renderProductCards,
  updateCartCount
}; 