/**
 * Abishek K - Personal Portfolio Website Script
 * Incorporates Canvas Particles, Custom Cursor, Magnetic Buttons,
 * 3D Tilt Cards, Typing Loops, and Intersection Scroll Reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initMobileMenu();
  initTypingEffect();
  initCanvasParticles();
  initCardTiltAndGlow();
  initScrollAnimations();
  initMagneticButtons();
  initContactForm();
  initScrollProgressAndActiveState();
  
  // Set current copyright year dynamically
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

/* ==========================================
   1. Preloader Screen
   ========================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  
  if (!preloader || !loaderBar) return;
  
  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      
      // Smooth fade-out after completion
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.visibility = 'hidden';
          // Trigger animations for elements in viewport on load
          document.body.classList.add('loaded');
        }, 600);
      }, 300);
    }
    loaderBar.style.width = `${progress}%`;
  }, 60);
}

/* ==========================================
   2. Custom Interactive Cursor
   ========================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;
  
  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate position for dot
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  
  // Smooth follow animation for outline
  function animateOutline() {
    // Linear interpolation: current + (target - current) * factor
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  
  // Hover effect states
  const interactables = document.querySelectorAll('a, button, input, textarea, .skills-card, .cert-card, .achievement-card');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
  
  // Hide cursor on leaving window boundaries
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  });
}

/* ==========================================
   3. Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!toggleBtn || !mobileMenu) return;
  
  const toggleMenu = () => {
    const isOpen = toggleBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    
    // Accessibility state modifications
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  };
  
  toggleBtn.addEventListener('click', toggleMenu);
  
  // Close menu when clicking link items
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================
   4. Typing Loop Animation
   ========================================== */
function initTypingEffect() {
  const textSpan = document.getElementById('typing-text');
  if (!textSpan) return;
  
  const roles = [
    "Full Stack Developer",
    "AI Developer",
    "Web Developer",
    "UI/UX Enthusiast",
    "Problem Solver"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      charIndex++;
      typingSpeed = 120; // Types at normal speed
    }
    
    textSpan.textContent = currentRole.substring(0, charIndex);
    
    // State logic checks
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Launch loop
  setTimeout(type, 1000);
}

/* ==========================================
   5. Interactive HTML5 Canvas Particles
   ========================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  
  // Set dimensions
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse context object
  const mouse = {
    x: null,
    y: null,
    radius: 120 // Radius of interaction
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  // Particle constructor
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
      this.baseSize = size;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    
    update() {
      // Keep boundaries inside screen width/height
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }
      
      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;
      
      // Mouse interaction (push away effect)
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          // Push particles back from mouse
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          
          const directionX = forceDirectionX * force * 5;
          const directionY = forceDirectionY * force * 5;
          
          this.x -= directionX;
          this.y -= directionY;
          
          // Shrink or grow size slightly near cursor
          this.size = Math.min(this.baseSize * 1.5, 4);
        } else {
          // Return to baseline size
          if (this.size > this.baseSize) {
            this.size -= 0.05;
          }
        }
      } else {
        if (this.size > this.baseSize) {
          this.size -= 0.05;
        }
      }
      
      this.draw();
    }
  }
  
  // Populate particles array
  function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 14000;
    numberOfParticles = Math.min(numberOfParticles, 120); // Cap on large screens
    
    const colors = [
      'rgba(0, 229, 255, 0.12)', // Cyan
      'rgba(123, 97, 255, 0.12)', // Purple
      'rgba(0, 255, 179, 0.12)'   // Mint
    ];
    
    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.8;
      let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
      let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = colors[Math.floor(Math.random() * colors.length)];
      
      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }
  
  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }
    // Draw links between nearby particles
    connectParticles();
    requestAnimationFrame(animate);
  }
  
  // Draw link lines between close particles
  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Alpha depends on proximity
          let opacity = (1 - (distance / 100)) * 0.05;
          ctx.strokeStyle = `rgba(123, 97, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Start canvas loop
  init();
  animate();
  
  // Reinitialize on resize
  window.addEventListener('resize', () => {
    init();
  });
}

/* ==========================================
   6. 3D Tilt Effect & Dynamic Card Glows
   ========================================== */
function initCardTiltAndGlow() {
  const cards = document.querySelectorAll('.skills-card, .cert-card, .project-card, .about-card, .achievement-card');
  
  cards.forEach(card => {
    // 1. Mouse coordinate tracking for CSS halo gradients
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within element
      const y = e.clientY - rect.top;  // y coordinate within element
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    // 2. 3D Tilt calculation (excluding textareas/inputs)
    if (card.hasAttribute('data-tilt')) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        
        // Mouse coordinate mapping to range [-0.5, 0.5]
        const mouseX = (e.clientX - rect.left) / cardWidth - 0.5;
        const mouseY = (e.clientY - rect.top) / cardHeight - 0.5;
        
        // Maximum rotation angles (degrees)
        const maxRotateX = 10;
        const maxRotateY = 10;
        
        const rotateX = (-mouseY * maxRotateX).toFixed(2);
        const rotateY = (mouseX * maxRotateY).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    }
  });

  // Specifically handle the profile 3D picture frame
  const portraitFrame = document.getElementById('portrait-3d-card');
  if (portraitFrame) {
    portraitFrame.addEventListener('mousemove', (e) => {
      const rect = portraitFrame.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;
      
      const rotX = (-mouseY * 15).toFixed(2);
      const rotY = (mouseX * 15).toFixed(2);
      
      const innerCard = portraitFrame.querySelector('.portrait-card');
      innerCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      // Adjust floating shapes slightly
      const shapes = portraitFrame.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        shape.style.transform = `translateX(${mouseX * speed}px) translateY(${mouseY * speed}px)`;
      });
    });
    
    portraitFrame.addEventListener('mouseleave', () => {
      const innerCard = portraitFrame.querySelector('.portrait-card');
      innerCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      
      const shapes = portraitFrame.querySelectorAll('.floating-shape');
      shapes.forEach(shape => {
        shape.style.transform = `none`;
      });
    });
  }
}

/* ==========================================
   7. Scroll Reveal Trigger Observer
   ========================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up');
  
  if (elements.length === 0) return;
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // Triggers early for smooth entrance
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve after showing
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  elements.forEach(el => observer.observe(el));
}

/* ==========================================
   8. Magnetic Attraction Buttons
   ========================================== */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Proximity distance formula
      const dx = mouseX - btnX;
      const dy = mouseY - btnY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Capture range (90px)
      if (distance < 90) {
        // Move button 35% of the distance towards the pointer
        const targetX = dx * 0.35;
        const targetY = dy * 0.35;
        
        btn.style.transform = `translate(${targetX}px, ${targetY}px)`;
        const innerText = btn.querySelector('span');
        if (innerText) {
          innerText.style.transform = `translate(${targetX * 0.2}px, ${targetY * 0.2}px)`;
        }
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0, 0)`;
      const innerText = btn.querySelector('span');
      if (innerText) {
        innerText.style.transform = `translate(0, 0)`;
      }
    });
  });
}

/* ==========================================
   9. Form Validations & Success Animation
   ========================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successOverlay = document.getElementById('form-success');
  const resetBtn = document.getElementById('reset-form-btn');
  
  if (!form || !successOverlay) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Perform inputs audits
    let hasErrors = false;
    const inputs = form.querySelectorAll('.form-control');
    
    inputs.forEach(input => {
      const parent = input.parentElement;
      parent.classList.remove('has-error');
      
      // Standard input checks
      if (input.value.trim() === '') {
        parent.classList.add('has-error');
        hasErrors = true;
      }
      
      // Email spec checks
      if (input.type === 'email' && input.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          parent.classList.add('has-error');
          hasErrors = true;
        }
      }
    });
    
    if (!hasErrors) {
      const submitBtn = form.querySelector('#submit-btn');
      const originalText = submitBtn.innerHTML;
      
      // Set to loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting...</span>';
      
      // Simulating database request time
      setTimeout(() => {
        // Show success screen overlay
        successOverlay.classList.add('show');
        
        // Reset submit button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();
        
        // Trigger achievements counter animation if contact page successfully visited!
        triggerAchievements();
      }, 1500);
    }
  });
  
  resetBtn.addEventListener('click', () => {
    successOverlay.classList.remove('show');
  });
}

/* ==========================================
   10. Scroll Progress Bar & Dynamic Navigation States
   ========================================== */
function initScrollProgressAndActiveState() {
  const progressBar = document.getElementById('scroll-progress');
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const dotLinks = document.querySelectorAll('.nav-dot');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Update Top Scrollbar width
    if (progressBar && docHeight > 0) {
      const scrollPct = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${scrollPct}%`;
    }
    
    // 2. Add blurred scrolled class to header
    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // 3. Highlight current nav links on scroll
    let currentId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 120; // offset spacing for sticky header
      const sectionHeight = sec.clientHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentId = sec.getAttribute('id');
      }
    });
    
    if (currentId) {
      // Navbar links
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
      
      // Right nav dots
      dotLinks.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('data-section') === currentId) {
          dot.classList.add('active');
        }
      });
    }
  });
  
  // Custom Smooth Scrolling trigger to handle clicking section dots cleanly
  dotLinks.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('data-section');
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        window.scrollTo({
          top: targetSec.offsetTop - 90,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================
   Helper: Achievements Incremental Counter Action
   ========================================== */
let countAnimationTriggered = false;

// Trigger numbers logic when achievements page enters viewpoint
const achievementsSection = document.getElementById('achievements');
if (achievementsSection) {
  const numObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countAnimationTriggered) {
        triggerAchievements();
      }
    });
  }, { threshold: 0.4 });
  
  numObserver.observe(achievementsSection);
}

function triggerAchievements() {
  const numberNodes = document.querySelectorAll('.achievement-number');
  countAnimationTriggered = true;
  
  numberNodes.forEach(node => {
    const target = parseInt(node.getAttribute('data-target'), 10);
    let current = 0;
    
    // Higher totals speed up increment rates
    const speed = target > 5000 ? 120 : target > 300 ? 5 : 1;
    const stepVal = Math.ceil(target / 100);
    
    const countInterval = setInterval(() => {
      current += stepVal;
      if (current >= target) {
        current = target;
        clearInterval(countInterval);
      }
      
      // Append '+' symbol for non-exact values
      if (target === 15 || target === 500 || target === 3 || target === 10000) {
        node.textContent = current.toLocaleString() + (target === 10000 ? '' : '+');
      } else {
        node.textContent = current.toLocaleString();
      }
    }, 15);
  });
}
