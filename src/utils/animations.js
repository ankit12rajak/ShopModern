// Animations utility functions using GSAP

// Initialize animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initHeaderAnimation();
  initHeroAnimation();
  initProductAnimation();
  initAOS();
  initScrollAnimations();
});

// Initialize AOS (Animate On Scroll) library
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true
    });
  }
}

// Animate header on scroll
function initHeaderAnimation() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      gsap.to(header, { 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        height: '70px',
        duration: 0.3
      });
    } else {
      header.classList.remove('scrolled');
      gsap.to(header, { 
        backgroundColor: 'rgba(255, 255, 255, 1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
        height: '80px',
        duration: 0.3
      });
    }
  });
}

// Animate hero section elements
function initHeroAnimation() {
  const heroElements = {
    title: document.querySelector('.hero h1'),
    text: document.querySelector('.hero p'),
    button: document.querySelector('.hero .btn')
  };

  if (!heroElements.title) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  tl.from(heroElements.title, { 
    y: 50, 
    opacity: 0, 
    duration: 0.8 
  })
  .from(heroElements.text, { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.6')
  .from(heroElements.button, { 
    y: 20, 
    opacity: 0, 
    duration: 0.8 
  }, '-=0.6');
}

// Animate product cards on hover
function initProductAnimation() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        y: -10, 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', 
        duration: 0.3 
      });
      
      gsap.to(card.querySelector('.product-image'), { 
        scale: 1.05, 
        duration: 0.3 
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        y: 0, 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', 
        duration: 0.3
      });
      
      gsap.to(card.querySelector('.product-image'), { 
        scale: 1, 
        duration: 0.3 
      });
    });
  });
}

// Add to cart animation
function addToCartAnimation(button) {
  gsap.fromTo(button, 
    { scale: 1 },
    { 
      scale: 1.2, 
      duration: 0.1, 
      yoyo: true, 
      repeat: 1,
      onComplete: () => {
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
          addFloatingCartAnimation(button, cartIcon);
        }
      }
    }
  );
}

// Floating item to cart animation
function addFloatingCartAnimation(button, cartIcon) {
  // Create floating element
  const buttonRect = button.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();
  
  const floatingElement = document.createElement('div');
  floatingElement.className = 'floating-cart-item';
  floatingElement.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background-color: var(--accent-color);
    border-radius: 50%;
    z-index: 1001;
    top: ${buttonRect.top + buttonRect.height / 2}px;
    left: ${buttonRect.left + buttonRect.width / 2}px;
  `;
  
  document.body.appendChild(floatingElement);
  
  // Animate to cart
  gsap.to(floatingElement, {
    top: cartRect.top + cartRect.height / 2,
    left: cartRect.left + cartRect.width / 2,
    scale: 0.5,
    duration: 0.8,
    ease: 'power3.inOut',
    onComplete: () => {
      document.body.removeChild(floatingElement);
      updateCartCountAnimation();
    }
  });
}

// Update cart count with animation
function updateCartCountAnimation() {
  const cartCount = document.querySelector('.cart-count');
  if (!cartCount) return;
  
  // Increment count
  const currentCount = parseInt(cartCount.textContent);
  cartCount.textContent = currentCount + 1;
  
  // Animate
  gsap.fromTo(cartCount, 
    { scale: 0.5, opacity: 0.5 },
    { scale: 1.2, opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }
  );
}

// Staggered animations on scroll
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const title = section.querySelector('.section-title');
    const items = section.querySelectorAll('.product-card, .feature-card, .testimonial-card');
    
    if (title && items.length > 0) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          gsap.from(title, { 
            y: 30, 
            opacity: 0, 
            duration: 0.8 
          });
          
          gsap.from(items, { 
            y: 50, 
            opacity: 0, 
            stagger: 0.1, 
            duration: 0.8,
            delay: 0.3
          });
        },
        once: true
      });
    }
  });
}

// Initialize product swiper
function initProductSwiper() {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.product-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 4,
        },
      }
    });
  }
}

// Export functions to be used in other files
export {
  addToCartAnimation,
  initProductSwiper
}; 