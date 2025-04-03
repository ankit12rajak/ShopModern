// Hero component for e-commerce website

// Create hero section with animation support
function createHero(config = {}) {
  const { 
    title = 'Discover Trending Products for Your Style', 
    subtitle = 'Shop the latest trends and discover premium quality products at amazing prices.',
    buttonText = 'Shop Now',
    buttonLink = '#products',
    backgroundImage = '',
    overlayColor = 'rgba(79, 70, 229, 0.9)',
    secondaryColor = 'rgba(129, 140, 248, 0.9)',
    alignment = 'left'
  } = config;
  
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.id = 'home';
  
  // Set background image if provided, otherwise use gradient
  if (backgroundImage) {
    hero.style.background = `linear-gradient(to right, ${overlayColor}, ${secondaryColor}), url(${backgroundImage})`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }
  
  // Set alignment classes
  hero.classList.add(`text-${alignment}`);
  
  hero.innerHTML = `
    <div class="container">
      <div class="hero-content" data-aos="fade-${alignment === 'right' ? 'left' : 'right'}">
        <h1>${title}</h1>
        <p>${subtitle}</p>
        <a href="${buttonLink}" class="btn btn-primary">${buttonText}</a>
      </div>
    </div>
  `;
  
  return hero;
}

// Create a hero with animated particles background
function createParticleHero(config = {}) {
  const hero = createHero(config);
  
  // Add particles container
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  hero.appendChild(particlesContainer);
  
  // Add the hero to the DOM first so we can access it for particles
  setTimeout(() => {
    if (typeof initParticles === 'function') {
      initParticles(particlesContainer);
    }
  }, 0);
  
  return hero;
}

// Initialize particles animation
function initParticles(container) {
  // Create multiple particles with random properties
  for (let i = 0; i < 50; i++) {
    createParticle(container);
  }
}

// Create a single animated particle
function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random size between 5px and 15px
  const size = Math.random() * 10 + 5;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  // Random position within container
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  
  // Random opacity between 0.1 and 0.5
  particle.style.opacity = Math.random() * 0.4 + 0.1;
  
  // Random animation duration between 10 and 30 seconds
  const duration = Math.random() * 20 + 10;
  particle.style.animationDuration = `${duration}s`;
  
  // Random animation delay
  particle.style.animationDelay = `${Math.random() * 5}s`;
  
  container.appendChild(particle);
  
  // Remove and recreate particle after animation completes
  setTimeout(() => {
    container.removeChild(particle);
    createParticle(container);
  }, duration * 1000);
}

// Create a hero with sliding background
function createSlidingHero(config = {}, images = []) {
  const { slideDuration = 5000 } = config;
  
  const hero = createHero(config);
  hero.classList.add('sliding-background');
  
  // Create image slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'hero-slider';
  
  // Add images to slider
  images.forEach(image => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    slide.style.backgroundImage = `url(${image})`;
    sliderContainer.appendChild(slide);
  });
  
  // Insert the slider at the beginning of hero
  hero.insertBefore(sliderContainer, hero.firstChild);
  
  // Start the slider
  let currentSlide = 0;
  
  function showSlide(index) {
    const slides = sliderContainer.querySelectorAll('.hero-slide');
    
    // Hide all slides
    slides.forEach(slide => {
      slide.style.opacity = 0;
      slide.style.zIndex = 0;
    });
    
    // Show current slide
    slides[index].style.opacity = 1;
    slides[index].style.zIndex = 1;
  }
  
  // Show first slide
  setTimeout(() => {
    showSlide(0);
    
    // Set up interval for automatic sliding
    setInterval(() => {
      currentSlide = (currentSlide + 1) % images.length;
      showSlide(currentSlide);
    }, slideDuration);
  }, 0);
  
  return hero;
}

// Mount the hero section to the DOM
function mountHero(config = {}, containerId = 'hero-container') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const hero = createHero(config);
  container.appendChild(hero);
  
  return hero;
}

// Export the hero component functions
export {
  createHero,
  createParticleHero,
  createSlidingHero,
  mountHero
}; 