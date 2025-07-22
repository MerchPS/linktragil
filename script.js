// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Hide loading screen when page is loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        lucide.createIcons(); // Refresh icons to update colors
    });

    // Add hover animations to links
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Simple scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.link-card');
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Store Functionality
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Shopping cart
    let cart = [];
    const cartItemsEl = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productEl = button.closest('.product');
            const productName = productEl.getAttribute('data-name');
            const productPrice = parseInt(productEl.getAttribute('data-price'));
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.name === productName);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Animation feedback
            button.textContent = '✓ Ditambahkan';
            setTimeout(() => {
                button.textContent = '+ Keranjang';
            }, 1000);
        });
    });
    
    // Update cart display
    function updateCart() {
        cartItemsEl.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            cartItemEl.innerHTML = `
                <div>
                    <span>${item.name}</span>
                    <span>${item.quantity} x Rp ${item.price.toLocaleString()}</span>
                </div>
                <div>
                    <span>Rp ${itemTotal.toLocaleString()}</span>
                    <button class="remove-item" data-index="${index}">
                        <i data-lucide="trash-2" width="16"></i>
                    </button>
                </div>
            `;
            
            cartItemsEl.appendChild(cartItemEl);
        });
        
        totalPriceEl.textContent = total.toLocaleString();
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
                lucide.createIcons();
            });
        });
        
        lucide.createIcons();
    }
    
    // Checkout functionality
    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang belanja kosong!');
            return;
        }
        
        const whatsappNumber = '6281914609483';
        let message = 'Halo, saya mau beli:\n';
        
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity}x) = Rp ${(item.price * item.quantity).toLocaleString()}\n`;
        });
        
        message += `\nTotal: Rp ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}\n`;
        message += 'Bisa saya minta QRIS untuk pembayaran?';
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
});
