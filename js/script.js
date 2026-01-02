// js/script.js - Student Portfolio

// Real Student Projects Data
const projectsData = [
    {
        id: 1,
        title: "Snake Game",
        description: "A classic Snake game built with Python and Pygame. Control the snake to eat food and grow while avoiding walls and collisions.",
        category: "python",
        tech: ["Python", "Pygame", "Game Development"],
        github: "https://github.com/khush3707/snake-game",
        live: null,
        featured: true,
        learned: [
            "Game loop implementation",
            "Collision detection algorithms",
            "Keyboard event handling",
            "Score tracking system"
        ]
    },
    {
    id: 2,
    title: "Smart Payment Tracker",
    description: "A web-based expense tracking system with HTML, CSS, JavaScript, and n8n workflow automation.",
    category: "web",
    tech: ["HTML", "CSS", "JavaScript", "n8n_Automation"],
    github: "https://github.com/khush3707/payment-tracker",
    live: null,
    featured: true,
    learned: [
        "Web form development and validation",
        "Workflow automation with n8n",
        "Data management in web applications",
        "UI/UX design for financial tools"
    ]
    },
    {
        id: 3,
        title: "FarmSetu Platform",
        description: "A web platform connecting farmers with consumers, built with HTML, CSS, and JavaScript.",
        category: "web",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        github: "https://github.com/khush3707/farmsetu",
        live: "https://khush3707.github.io/farmsetu",
        featured: true,
        learned: [
            "Responsive web design principles",
            "DOM manipulation techniques",
            "Form validation",
            "User interface design"
        ]
    },
    {
        id: 4,
        title: "Weather CLI App",
        description: "Command-line weather application that fetches data from a public API.",
        category: "python",
        tech: ["Python", "Requests", "API Integration", "CLI"],
        github: "https://github.com/khush3707/weather-cli",
        live: null,
        featured: false,
        learned: [
            "Working with REST APIs",
            "JSON data parsing",
            "Error handling in API calls",
            "Command-line argument parsing"
        ]
    }
];

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Initialize everything
    initTheme();
    initMobileMenu();
    initProjects();
    initContactForm();
    initBackToTop();
    initSkillBars();
    initCurrentYear();
    initSmoothScrolling();
    initActiveNav();
    
    // Add loaded class for final animations
    document.documentElement.classList.remove('no-js');
});

// ==========================================================================
// Theme Management
// ==========================================================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const theme = savedTheme === 'system' 
        ? (prefersDark ? 'dark' : 'light')
        : savedTheme;
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeToggle(theme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
}

function updateThemeToggle(theme) {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    const moonIcon = toggle.querySelector('.fa-moon');
    const sunIcon = toggle.querySelector('.fa-sun');
    
    if (theme === 'dark') {
        moonIcon.style.color = '#9ca3af';
        sunIcon.style.color = '#fbbf24';
    } else {
        moonIcon.style.color = '#fbbf24';
        sunIcon.style.color = '#9ca3af';
    }
}

// ==========================================================================
// Mobile Menu
// ==========================================================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuToggle.setAttribute('aria-expanded', 'true');
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMobileMenu);
    }
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');
    
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ==========================================================================
// Projects Management - Real Student Projects
// ==========================================================================

function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Only show featured projects initially
    const featuredProjects = projectsData.filter(p => p.featured);
    renderProjects(featuredProjects);
    
    // Add filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter and render projects
            const filter = button.dataset.filter;
            let filteredProjects;
            
            if (filter === 'all') {
                filteredProjects = projectsData.filter(p => p.featured);
            } else if (filter === 'ml') {
                // For now, show all since we don't have ML projects
                filteredProjects = projectsData.filter(p => p.featured);
            } else {
                filteredProjects = projectsData.filter(p => 
                    p.category === filter && p.featured
                );
            }
            
            renderProjects(filteredProjects);
        });
    });
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Clear existing projects
    projectsGrid.innerHTML = '';
    
    // Create project cards
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    
    // Get project image based on ID
    const projectImage = getProjectImage(project.id);
    
    // Build learned list HTML
    const learnedListHTML = project.learned ? `
        <div class="project-learned">
            <h5><i class="fas fa-graduation-cap"></i> What I Learned</h5>
            <ul role="list">
                ${project.learned.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    card.innerHTML = `
        <div class="project-image">
            ${projectImage}
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category}</span>
            </div>
            <p class="project-description">${project.description}</p>
            ${learnedListHTML}
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fab fa-github"></i>
                    <span>View Code</span>
                </a>` : ''}
                ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                    <span>Live Demo</span>
                </a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

function getProjectImage(id) {
    const colors = [
        'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',    // Snake Game
        'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',    // Payment Tracker
        'linear-gradient(135deg, #10b981 0%, #059669 100%)',    // FarmSetu
        'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'     // Weather CLI
    ];
    
    const icons = [
        '<i class="fas fa-gamepad"></i>',
        '<i class="fas fa-chart-line"></i>',
        '<i class="fas fa-leaf"></i>',
        '<i class="fas fa-cloud-sun"></i>'
    ];
    
    const colorIndex = (id - 1) % colors.length;
    const iconIndex = (id - 1) % icons.length;
    
    return `
        <div class="project-image-content" style="
            background: ${colors[colorIndex]};
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        ">
            ${icons[iconIndex]}
        </div>
    `;
}

// ==========================================================================
// Contact Form - Student Focus
// ==========================================================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add form validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
        color: var(--color-error);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.parentNode.appendChild(error);
    field.style.borderColor = 'var(--color-error)';
}

function clearFieldError(field) {
    const error = field.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
    field.style.borderColor = '';
}

async function handleFormSubmit(e) {
   e.preventDefault();
    const form = e.target;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        const response = await emailjs.sendForm(
            'YOUR_SERVICE_ID',     // Your EmailJS Service ID
            'YOUR_TEMPLATE_ID',    // Your EmailJS Template ID
            form                   // The HTML form element
        );
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showFormStatus('Thanks for reaching out! I\'ll get back to you soon.', 'success');
        
        // Reset the form
        form.reset();
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        showFormStatus('Something went wrong. Please try again later.', 'error');
        
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}
function showFormStatus(message, type) {
    const statusEl = document.getElementById('formStatus');
    if (!statusEl) return;
    
    statusEl.textContent = message;
    statusEl.className = type;
    statusEl.style.display = 'block';
    
    // Scroll to status
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusEl.style.display = 'none';
    }, 5000);
}

// ==========================================================================
// Skill Bars Animation
// ==========================================================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================================================
// Back to Top Button
// ==========================================================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================================================
// Smooth Scrolling
// ==========================================================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// ==========================================================================
// Active Navigation
// ==========================================================================

function initActiveNav() {
    const sections = document.querySelectorAll('section[data-section]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('data-section');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// Current Year
// ==========================================================================

function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================================================
// Event Listeners
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});

// Window load event for final initialization
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});