document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    hamburger.addEventListener('click', () => {
        navContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll-triggered animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const triggerBottom = window.innerHeight * 0.8;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // New header behavior on scroll
    const header = document.querySelector('.new-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // Modal functionality
    const modal = document.getElementById('cardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Card click event listeners
    document.querySelectorAll('.impact-item').forEach(card => {
        card.addEventListener('click', () => {
            const cardType = card.getAttribute('data-card');
            openModal(cardType);
        });
    });

    // Close modal when clicking the close button or outside the modal
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // Function to open modal with content based on card type
    function openModal(cardType) {
        const content = getCardContent(cardType);
        modalTitle.textContent = content.title;
        modalContent.innerHTML = content.html;
        modal.style.display = 'block';
    }

    // Function to get card content
    function getCardContent(cardType) {
        const contents = {
            education: {
                title: 'Education Impact',
                html: `
                    <img src="/api/placeholder/500/300" alt="Education Impact">
                    <p>Through our digital learning initiatives, we've connected over 1000 rural schools to online educational resources. This has resulted in a 30% increase in student engagement and a 25% improvement in test scores across these communities.</p>
                    <p>Our e-learning platforms have enabled students to access courses from top universities, broadening their horizons and opening up new career opportunities.</p>
                `
            },
            healthcare: {
                title: 'Healthcare Impact',
                html: `
                    <img src="/api/placeholder/500/300" alt="Healthcare Impact">
                    <p>Our telemedicine services have brought quality healthcare to over 500 remote villages. This has led to a 40% reduction in travel time for medical consultations and a 35% increase in early disease detection rates.</p>
                    <p>We've also implemented health information systems in 200 rural clinics, improving patient care and reducing administrative overhead by 50%.</p>
                `
            },
            agriculture: {
                title: 'Agricultural Impact',
                html: `
                    <img src="/api/placeholder/500/300" alt="Agricultural Impact">
                    <p>By providing real-time market data and weather forecasts to farmers, we've helped increase crop yields by 25% and reduced post-harvest losses by 30% across 1000 villages.</p>
                    <p>Our digital platform has connected farmers directly to buyers, eliminating middlemen and increasing farmer incomes by an average of 20%.</p>
                `
            },
            financial: {
                title: 'Financial Inclusion Impact',
                html: `
                    <img src="/api/placeholder/500/300" alt="Financial Inclusion Impact">
                    <p>Our mobile banking solutions have brought formal financial services to over 2 million previously unbanked individuals in rural areas. This has led to a 40% increase in savings rates and a 50% reduction in the cost of remittances.</p>
                    <p>We've also facilitated micro-loans to 100,000 small businesses, fostering entrepreneurship and economic growth in rural communities.</p>
                `
            }
        };
        return contents[cardType] || { title: 'Information', html: '<p>Details not available.</p>' };
    }

    // Animated counter for impact numbers
    const animateCounter = (element, target, duration) => {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS

        const updateCounter = () => {
            start += increment;
            element.textContent = Math.floor(start);

            if (start < target) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Example usage (you'll need to add elements with class 'counter' to your HTML)
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target, 2000); // 2000ms duration
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero h1');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';

    const typeWriter = (text, i = 0) => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 100);
        }
    };

    setTimeout(() => typeWriter(text), 500);
});