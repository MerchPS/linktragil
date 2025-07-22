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
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.05})`;
            this.alpha = Math.random() * 0.5 + 0.05;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    const particles = [];
    for (let i = 0; i < 80; i++) {
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
    
    // Start animations immediately
    animateParticles();
    initAnimations();
    
    // Show WhatsApp popup after 1 second
    setTimeout(showWhatsAppPopup, 1000);
    
    function initAnimations() {
        // GSAP Animations
        gsap.from(".profile-text", {
            duration: 1,
            y: -30,
            opacity: 0,
            ease: "power2.out"
        });
        
        const linkCards = document.querySelectorAll('.link-card');
        linkCards.forEach((card, index) => {
            gsap.from(card, {
                duration: 0.6,
                x: -30,
                opacity: 0,
                delay: index * 0.1,
                ease: "power2.out"
            });
            
            // Hover effect
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.2,
                    scale: 1.02,
                    ease: "power1.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power1.out"
                });
            });
        });
        
        // Floating icons animation
        const floatingIcons = document.querySelectorAll('.floating-icons i');
        floatingIcons.forEach((icon, index) => {
            gsap.from(icon, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: index * 0.15 + 0.5,
                ease: "back.out(1.7)"
            });
        });
        
        // Ripple effect for links
        linkCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const targetUrl = this.getAttribute('href');
                
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
                    window.open(targetUrl, '_blank');
                }, 500);
            });
        });
    }
    
    function showWhatsAppPopup() {
        // Check if popup was shown before (using localStorage)
        const popupShown = localStorage.getItem('whatsappPopupShown');
        
        if (!popupShown) {
            Swal.fire({
                title: 'Join Our Community!',
                html: `
                    <div style="text-align:center;">
                        <p style="margin-bottom:15px;color:var(--text-light);">Connect with Leon Community members in our WhatsApp group for chatting, gaming (including CDID Roblox), and more!</p>
                        <div style="background:rgba(255,255,255,0.05);padding:15px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);margin:15px 0;">
                            <i class="fab fa-whatsapp" style="font-size:2rem;color:var(--whatsapp);margin-bottom:10px;"></i>
                            <p style="font-size:0.9rem;color:var(--text-light);">Click below to join instantly</p>
                        </div>
                    </div>
                `,
                showConfirmButton: true,
                confirmButtonText: 'Join WhatsApp Group',
                showCancelButton: true,
                cancelButtonText: 'Maybe Later',
                focusConfirm: false,
                customClass: {
                    container: 'swal-dark-container',
                    popup: 'swal-dark-popup',
                    title: 'swal-dark-title',
                    htmlContainer: 'swal-dark-html',
                    confirmButton: 'swal-dark-confirm',
                    cancelButton: 'swal-dark-cancel'
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
