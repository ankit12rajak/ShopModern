// Header component for the e-commerce website

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
});

// Function to handle mobile navigation
function initMobileNav() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuToggle || !navLinks) return;
  
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
}

// Function to handle header scroll behavior
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Function to handle cart dropdown
function toggleCartDropdown() {
  const cartDropdown = document.querySelector('.cart-dropdown');
  if (cartDropdown) {
    cartDropdown.classList.toggle('active');
  }
}

// Create header with mobile menu
function createHeader() {
  const header = document.createElement('header');
  
  header.innerHTML = `
    <div class="container">
      <nav>
        <div class="logo">ShopModern</div>
        <div class="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div class="nav-right">
          <div class="search-icon">
            <i class='bx bx-search'></i>
          </div>
          <div class="cart-icon" onclick="toggleCartDropdown()">
            <i class='bx bx-cart'></i>
            <span class="cart-count">0</span>
            <div class="cart-dropdown">
              <div class="cart-items">
                <p class="empty-cart-message">Your cart is empty</p>
                <!-- Cart items will be dynamically added here -->
              </div>
              <div class="cart-total">
                <p>Total: <span class="total-amount">$0.00</span></p>
                <a href="#checkout" class="btn btn-primary">Checkout</a>
              </div>
            </div>
          </div>
          <div class="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
  `;
  
  return header;
}

// Function to mount header to the DOM
function mountHeader() {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.appendChild(createHeader());
    initMobileNav();
    initHeaderScroll();
  }
}

// Export functions
export {
  createHeader,
  mountHeader,
  toggleCartDropdown
}; 