document.addEventListener('DOMContentLoaded', function() {
    // Set initial loaded state
    document.body.classList.add('loaded');
    
    // Animate profile header
    const profileHeader = document.querySelector('.profile-header');
    setTimeout(() => {
        profileHeader.classList.add('loaded');
    }, 100);
    
    // Animate link cards with staggered delay
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('loaded');
        }, 200 + (index * 100));
    });
    
    // Add hover effects
    linkCards.forEach(card => {
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
        
        // Click animation
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            gsap.to(this, {
                duration: 0.1,
                scale: 0.98,
                ease: "power1.out",
                onComplete: () => {
                    window.open(targetUrl, '_blank');
                    gsap.to(this, {
                        duration: 0.1,
                        scale: 1,
                        ease: "power1.out"
                    });
                }
            });
        });
    });
});
