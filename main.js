 // ===== VARIABLES GLOBALES =====
let cartCount = 0;
let cartItems = [];
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const menuLinks = document.querySelectorAll('.nav-links a');

// ===== GESTION DU MENU MOBILE =====
function toggleMenu() {
    hamburger?.classList.toggle('active');
    navLinks?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

const closeMenu = () => {
    hamburger?.classList.remove('active');
    navLinks?.classList.remove('active');
    document.body.classList.remove('menu-open');
};

// Fermer le menu au clic sur un lien
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (navLinks?.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        closeMenu();
    }
});

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('active')) {
        closeMenu();
    }
});

// ===== GESTION DU PANIER =====
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    updateCartDisplay();
}

function closeCartOutside(event) {
    if (event.target.id === 'cartModal') {
        toggleCart();
    }
}

function openWhatsApp() {
    const phoneNumber = '212600000000';
    const message = 'Bonjour WATSB! 💎 Je souhaite découvrir vos accessoires de luxe.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function scrollToProducts() {
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

function addToCart(productName, price) {
    const existingItem = cartItems.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    cartIcon.style.transform = 'scale(1.3) rotate(10deg)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1) rotate(0deg)';
    }, 400);
    
    alert(`✨ ${productName} ajouté à votre panier!`);
}

function removeFromCart(index) {
    const item = cartItems[index];
    cartCount -= item.quantity;
    cartItems.splice(index, 1);
    
    document.querySelector('.cart-count').textContent = cartCount;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalAmount = document.getElementById('totalAmount');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <p>Votre panier est vide</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Ajoutez des produits pour commencer !</p>
            </div>
        `;
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
    } else {
        let total = 0;
        cartItemsContainer.innerHTML = cartItems.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name} ${item.quantity > 1 ? `(x${item.quantity})` : ''}</div>
                        <div class="cart-item-price">${item.price * item.quantity} MAD</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        🗑️
                    </button>
                </div>
            `;
        }).join('');
        
        cartTotal.style.display = 'block';
        checkoutBtn.style.display = 'block';
        totalAmount.textContent = `${total} MAD`;
    }
}

function checkoutWhatsApp() {
    if (cartItems.length === 0) return;
    
    const phoneNumber = '212600000000';
    let message = `Bonjour WATSB! 💎\n\nJe souhaite commander:\n\n`;
    
    let total = 0;
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `✨ ${item.name}\n`;
        message += `   Quantité: ${item.quantity}\n`;
        message += `   Prix: ${itemTotal} MAD\n\n`;
    });
    
    message += `💰 *Total: ${total} MAD*\n\n`;
    message += `Merci de me confirmer la disponibilité.`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ANIMATIONS AU SCROLL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    observer.observe(card);
});
