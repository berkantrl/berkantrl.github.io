/**
 * Berkan Türel - Cyber Security Analyst
 * Portfolio Website JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  // Cursor trail elements
  const trailCount = 5;
  const trails = [];
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (1 - i / trailCount) * 0.3;
    trail.style.width = (8 - i) + 'px';
    trail.style.height = (8 - i) + 'px';
    document.body.appendChild(trail);
    trails.push({ el: trail, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth cursor animation
  function animateCursor() {
    // Ease cursor
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    // Animate trails
    let prevX = mouseX, prevY = mouseY;
    trails.forEach((trail, i) => {
      const speed = 0.3 - i * 0.04;
      trail.x += (prevX - trail.x) * speed;
      trail.y += (prevY - trail.y) * speed;
      trail.el.style.left = trail.x + 'px';
      trail.el.style.top = trail.y + 'px';
      prevX = trail.x;
      prevY = trail.y;
    });

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .blog-card, .badge, .contact-link');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    trails.forEach(t => t.el.style.opacity = '0');
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
    trails.forEach((t, i) => t.el.style.opacity = (1 - i / trailCount) * 0.3);
  });

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Subtle scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in animation to sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
      } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.9)';
      }
    });
  }
});
