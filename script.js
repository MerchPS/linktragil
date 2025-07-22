document.addEventListener('DOMContentLoaded', function() {
    // Show page loader
    const pageLoader = document.querySelector('.page-loader');
    const container = document.querySelector('.container');
    
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
    
    // Simulate loading
    setTimeout(() => {
        // Hide loader and show content
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.style.display = 'none';
            container.classList.add('loaded');
            
            // Start animations
            animateParticles();
            initAnimations();
            
            // Show WhatsApp popup after 1 second
            setTimeout(showWhatsAppPopup, 1000);
        }, 500);
    }, 2000);
    
    function initAnimations() {
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
    }
    
    function showWhatsAppPopup() {
        // Check if popup was shown before (using localStorage)
        const popupShown = localStorage.getItem('whatsappPopupShown');
        
        if (!popupShown) {
            Swal.fire({
                title: 'Join Our WhatsApp Group!',
                html: '<p>Connect with the Leon Community in our public WhatsApp group for chatting, gaming (including CDID Roblox), and more!</p>',
                icon: 'info',
                imageUrl: 'https://i.imgur.com/JNvH4Qp.png',
                imageWidth: 100,
                imageHeight: 100,
                imageAlt: 'Leon Community',
                showConfirmButton: true,
                confirmButtonText: 'Join Now',
                showCancelButton: true,
                cancelButtonText: 'Maybe Later',
                backdrop: `
                    rgba(0,0,0,0.4)
                    url("https://i.pinimg.com/originals/8b/9b/47/8b9b47a0c857c527a8c54f0a46e61f5e.gif")
                    center top
                    no-repeat
                `,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                customClass: {
                    container: 'swal-container',
                    popup: 'swal-popup',
                    header: 'swal-header',
                    title: 'swal-title',
                    closeButton: 'swal-close',
                    icon: 'swal-icon',
                    image: 'swal-image',
                    content: 'swal-content',
                    input: 'swal-input',
                    actions: 'swal-actions',
                    confirmButton: 'swal-confirm',
                    cancelButton: 'swal-cancel',
                    footer: 'swal-footer'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    window.open('https://chat.whatsapp.com/GMepqMOSEqKA6EDRdVSrNt', '_blank');
                }
                
                // Set flag that popup was shown
                localStorage.setItem('whatsappPopupShown', 'true');
            });
        }
    }
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
