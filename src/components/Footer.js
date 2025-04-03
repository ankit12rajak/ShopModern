// Footer component for e-commerce website

// Create footer element
function createFooter() {
  const footer = document.createElement('footer');
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-column">
          <h3>ShopModern</h3>
          <p>We provide the best products at the best prices. Shop with confidence.</p>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><i class='bx bxl-facebook'></i></a>
            <a href="#" aria-label="Twitter"><i class='bx bxl-twitter'></i></a>
            <a href="#" aria-label="Instagram"><i class='bx bxl-instagram'></i></a>
            <a href="#" aria-label="Pinterest"><i class='bx bxl-pinterest'></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Shop</h3>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Featured Products</a></li>
            <li><a href="#">Discounted Products</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Information</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      <div class="newsletter-subscribe">
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get the latest updates and offers delivered directly to your inbox.</p>
        <form class="newsletter-form" id="footer-newsletter-form">
          <input type="email" placeholder="Enter your email" required>
          <button type="submit" class="btn">Subscribe</button>
        </form>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ShopModern. All rights reserved.</p>
        <div class="payment-methods">
          <img src="https://cdn.jsdelivr.net/gh/headwayio/shop-modern-assets/payment-visa.svg" alt="Visa">
          <img src="https://cdn.jsdelivr.net/gh/headwayio/shop-modern-assets/payment-mastercard.svg" alt="Mastercard">
          <img src="https://cdn.jsdelivr.net/gh/headwayio/shop-modern-assets/payment-paypal.svg" alt="PayPal">
          <img src="https://cdn.jsdelivr.net/gh/headwayio/shop-modern-assets/payment-amex.svg" alt="American Express">
        </div>
      </div>
    </div>
  `;
  
  // Add event listener for newsletter form
  const newsletterForm = footer.querySelector('#footer-newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  return footer;
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type="email"]');
  const email = emailInput.value.trim();
  
  if (!email) return;
  
  // In a real application, you would send this to your backend
  // For now, we'll just simulate success
  emailInput.value = '';
  
  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'newsletter-success';
  successMessage.textContent = 'Thank you for subscribing to our newsletter!';
  
  const form = e.target;
  form.parentNode.appendChild(successMessage);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    form.parentNode.removeChild(successMessage);
  }, 3000);
  
  // Store in localStorage (for demo purposes)
  const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers')) || [];
  subscribers.push({
    email,
    date: new Date().toISOString()
  });
  localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
}

// Mount footer to the DOM
function mountFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.appendChild(createFooter());
  }
}

// Initialize footer with current year and event listeners
function initFooter() {
  // Update copyright year
  const copyright = document.querySelector('.footer-bottom p');
  if (copyright) {
    copyright.textContent = copyright.textContent.replace(/\d{4}/, new Date().getFullYear());
  }
  
  // Add smooth scroll to footer links
  const footerLinks = document.querySelectorAll('footer a[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initFooter);

export {
  createFooter,
  mountFooter
}; 