document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particle Canvas
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle System
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 200)}, ${Math.random() * 0.5 + 0.1})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // GSAP Animations
    gsap.from(".profile-text", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "back.out(1.7)"
    });
    
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        gsap.from(card, {
            duration: 0.8,
            x: -50,
            opacity: 0,
            delay: index * 0.1 + 0.5,
            ease: "power3.out"
        });
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1.02,
                ease: "power1.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                scale: 1,
                ease: "power1.out"
            });
        });
    });
    
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icons i');
    floatingIcons.forEach((icon, index) => {
        gsap.from(icon, {
            duration: 1,
            y: 50,
            opacity: 0,
            delay: index * 0.2 + 1,
            ease: "elastic.out(1, 0.5)"
        });
    });
    
    // Ripple effect for links
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
