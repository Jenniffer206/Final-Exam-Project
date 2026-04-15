/* =========================================
   LUCKYCROCHET JAVASCRIPT
   Interactive Features:
   - Dark/Light Mode Toggle
   - Hamburger Menu (Responsive)
   - Image Carousel/Slider
   - Dynamic Greeting & Real-time Clock
   - Order Popup Modal with WhatsApp Integration
   - Form Validation
   - Gallery Filter & Lightbox
   ========================================= */

// =========================================
// 1. DARK MODE TOGGLE
// =========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        updateDarkModeIcon(isDarkMode);
    });
}

function updateDarkModeIcon(isDark) {
    if (!darkModeToggle) return;
    const icon = darkModeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// =========================================
// 2. HAMBURGER MENU (Responsive Navigation)
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// =========================================
// 3. IMAGE CAROUSEL/SLIDER
// =========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const carouselSlides = document.getElementById('carouselSlides');
const carouselDots = document.getElementById('carouselDots');

// Generate dots dynamically
if (carouselSlides && carouselDots) {
    const slideCount = slides.length;
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => currentSlideIndex(i));
        carouselDots.appendChild(dot);
    }
}

const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (!carouselSlides) return;
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

function currentSlideIndex(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
if (carouselSlides) {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// =========================================
// 4. DYNAMIC GREETING & REAL-TIME CLOCK
// =========================================
function updateGreeting() {
    const greetingElement = document.getElementById('dynamicGreeting');
    if (!greetingElement) return;
    
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = '☀️ Mwaramutse! Good Morning!';
    } else if (hour < 18) {
        greeting = '🌤️ Mwiriwe! Good Afternoon!';
    } else {
        greeting = '🌙 Mwiriwe! Good Evening!';
    }
    
    greetingElement.textContent = greeting;
}

function updateClock() {
    const clockElement = document.getElementById('realTimeClock');
    if (!clockElement) return;
    
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateGreeting();
updateClock();
setInterval(updateClock, 1000);
setInterval(updateGreeting, 60000);

// =========================================
// 5. SCROLL TO PRODUCTS
// =========================================
function scrollToProducts() {
    const productsSection = document.getElementById('newArrivals');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// =========================================
// 6. ORDER POPUP MODAL WITH WHATSAPP
// =========================================
const orderModal = document.getElementById('orderModal');
let currentProductName = '';
let currentProductPrice = '';

function openOrderPopup(productName, price) {
    if (!orderModal) return;
    
    currentProductName = productName;
    currentProductPrice = price;
    
    const nameEl = document.getElementById('selectedProductName');
    const priceEl = document.getElementById('selectedProductPrice');
    if (nameEl) nameEl.textContent = `Product: ${productName}`;
    if (priceEl) priceEl.textContent = `Price: ${price} Rwf`;
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderPopup() {
    if (!orderModal) return;
    
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) orderForm.reset();
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === orderModal) {
        closeOrderPopup();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal && orderModal.classList.contains('active')) {
        closeOrderPopup();
    }
});

// =========================================
// 7. FORM VALIDATION & WHATSAPP INTEGRATION
// =========================================
// WHATSAPP NUMBER: +250790702735
// CURRENCY: Rwandan Francs (Rwf)
// =========================================
function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('customerName')?.value.trim() || '';
    const email = document.getElementById('customerEmail')?.value.trim() || '';
    const phone = document.getElementById('customerPhone')?.value.trim() || '';
    const quantity = document.getElementById('orderQuantity')?.value || '1';
    const color = document.getElementById('orderColor')?.value || 'As shown';
    const address = document.getElementById('shippingAddress')?.value.trim() || '';
    const notes = document.getElementById('orderNotes')?.value.trim() || '';
    const contactMethodEl = document.querySelector('input[name="contactMethod"]:checked');
    const contactMethod = contactMethodEl ? contactMethodEl.value : 'WhatsApp';
    
    // Reset errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validation
    let isValid = true;
    
    if (!name) {
        const nameError = document.getElementById('nameError');
        if (nameError) nameError.textContent = 'Name is required';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        const emailError = document.getElementById('emailError');
        if (emailError) emailError.textContent = 'Valid email is required';
        isValid = false;
    }
    
    if (!phone) {
        const phoneError = document.getElementById('phoneError');
        if (phoneError) phoneError.textContent = 'Phone number is required';
        isValid = false;
    }
    
    if (!address) {
        const addressError = document.getElementById('addressError');
        if (addressError) addressError.textContent = 'Shipping address is required';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Build WhatsApp message with Rwf currency
    const message = `🛍️ *NEW ORDER - LUCKYCROCHET*%0A%0A` +
                   `*Product:* ${currentProductName}%0A` +
                   `*Price:* ${currentProductPrice} Rwf%0A` +
                   `*Quantity:* ${quantity}%0A` +
                   `*Color:* ${color}%0A%0A` +
                   `*Customer Details:*%0A` +
                   `Name: ${name}%0A` +
                   `Email: ${email}%0A` +
                   `Phone: ${phone}%0A%0A` +
                   `*Shipping Address:*%0A${address}%0A%0A` +
                   `*Additional Notes:*%0A${notes || 'None'}%0A%0A` +
                   `*Preferred Contact:* ${contactMethod}`;
    
    // UPDATED WhatsApp number: +250790702735
    const whatsappNumber = '250790702735'; // Country code 250 + number
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    
    // Close modal
    closeOrderPopup();
    
    // Show success message
    alert(' Murakoze! Thank you! You will be redirected to WhatsApp to complete your order.');
}

// =========================================
// 8. CONTACT FORM VALIDATION
// =========================================
function validateContactForm(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value || '';
    const message = document.getElementById('message')?.value.trim() || '';
    
    // Reset errors
    document.querySelectorAll('#contactForm .error-message').forEach(el => el.textContent = '');
    
    let isValid = true;
    
    if (!fullName) {
        const nameError = document.getElementById('fullNameError');
        if (nameError) nameError.textContent = 'Full name is required';
        isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        const emailError = document.getElementById('emailError');
        if (emailError) emailError.textContent = 'Valid email is required';
        isValid = false;
    }
    
    if (!subject) {
        const subjectError = document.getElementById('subjectError');
        if (subjectError) subjectError.textContent = 'Please select a subject';
        isValid = false;
    }
    
    if (!message || message.length < 10) {
        const messageError = document.getElementById('messageError');
        if (messageError) messageError.textContent = 'Message must be at least 10 characters';
        isValid = false;
    }
    
    if (isValid) {
        const whatsappNumber = '250790702735';
        const messageText = `Hello LuckyCrochet team!\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nSubject: ${subject}\nMessage:\n${message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

        const successMsg = document.getElementById('successMessage');
        const contactForm = document.getElementById('contactForm');
        if (successMsg) {
            successMsg.style.display = 'block';
            const statusText = successMsg.querySelector('span');
            if (statusText) {
                statusText.textContent = 'Opening WhatsApp with your message. Please send the message in WhatsApp to complete your request.';
            }
        }
        if (contactForm) contactForm.reset();

        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            if (successMsg) successMsg.style.display = 'none';
        }, 7000);
    }
    
    return false;
}

// =========================================
// 9. GALLERY FUNCTIONALITY (Filter & Lightbox)
// =========================================

// GALLERY DATA - ALL 224 PRODUCT IMAGES (FIXED PATHS FOR SUBFOLDER)
const galleryData = [
    // BAGS (10 images)
    { category: 'bags', src: 'Images/Bags/Bag (1).png', caption: 'Crochet Bag - Style 1' },
    { category: 'bags', src: 'Images/Bags/Bag (2).png', caption: 'Crochet Bag - Style 2' },
    { category: 'bags', src: 'Images/Bags/Bag (3).png', caption: 'Crochet Bag - Style 3' },
    { category: 'bags', src: 'Images/Bags/Bag (4).png', caption: 'Crochet Bag - Style 4' },
    { category: 'bags', src: 'Images/Bags/Bag (5).png', caption: 'Crochet Bag - Style 5' },
    { category: 'bags', src: 'Images/Bags/Bag (6).png', caption: 'Crochet Bag - Style 6' },
    { category: 'bags', src: 'Images/Bags/Bag (7).png', caption: 'Crochet Bag - Style 7' },
    { category: 'bags', src: 'Images/Bags/Bag (8).png', caption: 'Crochet Bag - Style 8' },
    { category: 'bags', src: 'Images/Bags/Bag (9).png', caption: 'Crochet Bag - Style 9' },
    { category: 'bags', src: 'Images/Bags/Bag (10).png', caption: 'Crochet Bag - Style 10' },

    // BLANKETS (9 images)
    { category: 'blankets', src: 'Images/Blanket/Blanket (1).png', caption: 'Handmade Blanket - Style 1' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (2).png', caption: 'Handmade Blanket - Style 2' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (3).png', caption: 'Handmade Blanket - Style 3' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (4).png', caption: 'Handmade Blanket - Style 4' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (5).png', caption: 'Handmade Blanket - Style 5' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (6).png', caption: 'Handmade Blanket - Style 6' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (7).png', caption: 'Handmade Blanket - Style 7' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (8).png', caption: 'Handmade Blanket - Style 8' },
    { category: 'blankets', src: 'Images/Blanket/Blanket (9).png', caption: 'Handmade Blanket - Style 9' },

    // HATS (24 images)
    { category: 'hats', src: 'Images/Hats/Hat (1).png', caption: 'Crochet Hat - Style 1' },
    { category: 'hats', src: 'Images/Hats/Hat (2).png', caption: 'Crochet Hat - Style 2' },
    { category: 'hats', src: 'Images/Hats/Hat (3).png', caption: 'Crochet Hat - Style 3' },
    { category: 'hats', src: 'Images/Hats/Hat (4).png', caption: 'Crochet Hat - Style 4' },
    { category: 'hats', src: 'Images/Hats/Hat (5).png', caption: 'Crochet Hat - Style 5' },
    { category: 'hats', src: 'Images/Hats/Hat (6).png', caption: 'Crochet Hat - Style 6' },
    { category: 'hats', src: 'Images/Hats/Hat (7).png', caption: 'Crochet Hat - Style 7' },
    { category: 'hats', src: 'Images/Hats/Hat (8).png', caption: 'Crochet Hat - Style 8' },
    { category: 'hats', src: 'Images/Hats/Hat (9).png', caption: 'Crochet Hat - Style 9' },
    { category: 'hats', src: 'Images/Hats/Hat (10).png', caption: 'Crochet Hat - Style 10' },
    { category: 'hats', src: 'Images/Hats/Hat (11).png', caption: 'Crochet Hat - Style 11' },
    { category: 'hats', src: 'Images/Hats/Hat (12).png', caption: 'Crochet Hat - Style 12' },
    { category: 'hats', src: 'Images/Hats/Hat (13).png', caption: 'Crochet Hat - Style 13' },
    { category: 'hats', src: 'Images/Hats/Hat (14).png', caption: 'Crochet Hat - Style 14' },
    { category: 'hats', src: 'Images/Hats/Hat (15).png', caption: 'Crochet Hat - Style 15' },
    { category: 'hats', src: 'Images/Hats/Hat (16).png', caption: 'Crochet Hat - Style 16' },
    { category: 'hats', src: 'Images/Hats/Hat (17).png', caption: 'Crochet Hat - Style 17' },
    { category: 'hats', src: 'Images/Hats/Hat (18).png', caption: 'Crochet Hat - Style 18' },
    { category: 'hats', src: 'Images/Hats/Hat (19).png', caption: 'Crochet Hat - Style 19' },
    { category: 'hats', src: 'Images/Hats/Hat (20).png', caption: 'Crochet Hat - Style 20' },
    { category: 'hats', src: 'Images/Hats/Hat (21).png', caption: 'Crochet Hat - Style 21' },
    { category: 'hats', src: 'Images/Hats/Hat (22).png', caption: 'Crochet Hat - Style 22' },
    { category: 'hats', src: 'Images/Hats/Hat (23).png', caption: 'Crochet Hat - Style 23' },
    { category: 'hats', src: 'Images/Hats/Hat (24).png', caption: 'Crochet Hat - Style 24' },

    // KIDS (31 images)
    { category: 'kids', src: 'Images/Kids/Kid_Product (1).png', caption: 'Kids Crochet - Style 1' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (2).png', caption: 'Kids Crochet - Style 2' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (3).png', caption: 'Kids Crochet - Style 3' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (4).png', caption: 'Kids Crochet - Style 4' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (5).png', caption: 'Kids Crochet - Style 5' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (6).png', caption: 'Kids Crochet - Style 6' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (7).png', caption: 'Kids Crochet - Style 7' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (8).png', caption: 'Kids Crochet - Style 8' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (9).png', caption: 'Kids Crochet - Style 9' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (10).png', caption: 'Kids Crochet - Style 10' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (11).png', caption: 'Kids Crochet - Style 11' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (12).png', caption: 'Kids Crochet - Style 12' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (13).png', caption: 'Kids Crochet - Style 13' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (14).png', caption: 'Kids Crochet - Style 14' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (15).png', caption: 'Kids Crochet - Style 15' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (16).png', caption: 'Kids Crochet - Style 16' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (21).png', caption: 'Kids Crochet - Style 21' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (23).png', caption: 'Kids Crochet - Style 23' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (24).png', caption: 'Kids Crochet - Style 24' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (25).png', caption: 'Kids Crochet - Style 25' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (26).png', caption: 'Kids Crochet - Style 26' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (27).png', caption: 'Kids Crochet - Style 27' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (28).png', caption: 'Kids Crochet - Style 28' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (29).png', caption: 'Kids Crochet - Style 29' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (30).png', caption: 'Kids Crochet - Style 30' },
    { category: 'kids', src: 'Images/Kids/Kid_Product (31).png', caption: 'Kids Crochet - Style 31' },

    // MEN (27 images)
    { category: 'clothing', src: 'Images/Men/Men_Product (1).png', caption: 'Men\'s Crochet - Style 1' },
    { category: 'clothing', src: 'Images/Men/Men_Product (2).png', caption: 'Men\'s Crochet - Style 2' },
    { category: 'clothing', src: 'Images/Men/Men_Product (3).png', caption: 'Men\'s Crochet - Style 3' },
    { category: 'clothing', src: 'Images/Men/Men_Product (4).png', caption: 'Men\'s Crochet - Style 4' },
    { category: 'clothing', src: 'Images/Men/Men_Product (5).png', caption: 'Men\'s Crochet - Style 5' },
    { category: 'clothing', src: 'Images/Men/Men_Product (6).png', caption: 'Men\'s Crochet - Style 6' },
    { category: 'clothing', src: 'Images/Men/Men_Product (7).png', caption: 'Men\'s Crochet - Style 7' },
    { category: 'clothing', src: 'Images/Men/Men_Product (8).png', caption: 'Men\'s Crochet - Style 8' },
    { category: 'clothing', src: 'Images/Men/Men_Product (9).png', caption: 'Men\'s Crochet - Style 9' },
    { category: 'clothing', src: 'Images/Men/Men_Product (10).png', caption: 'Men\'s Crochet - Style 10' },
    { category: 'clothing', src: 'Images/Men/Men_Product (11).png', caption: 'Men\'s Crochet - Style 11' },
    { category: 'clothing', src: 'Images/Men/Men_Product (12).png', caption: 'Men\'s Crochet - Style 12' },
    { category: 'clothing', src: 'Images/Men/Men_Product (13).png', caption: 'Men\'s Crochet - Style 13' },
    { category: 'clothing', src: 'Images/Men/Men_Product (14).png', caption: 'Men\'s Crochet - Style 14' },
    { category: 'clothing', src: 'Images/Men/Men_Product (15).png', caption: 'Men\'s Crochet - Style 15' },
    { category: 'clothing', src: 'Images/Men/Men_Product (16).png', caption: 'Men\'s Crochet - Style 16' },
    { category: 'clothing', src: 'Images/Men/Men_Product (17).png', caption: 'Men\'s Crochet - Style 17' },
    { category: 'clothing', src: 'Images/Men/Men_Product (18).png', caption: 'Men\'s Crochet - Style 18' },
    { category: 'clothing', src: 'Images/Men/Men_Product (19).png', caption: 'Men\'s Crochet - Style 19' },
    { category: 'clothing', src: 'Images/Men/Men_Product (20).png', caption: 'Men\'s Crochet - Style 20' },
    { category: 'clothing', src: 'Images/Men/Men_Product (21).png', caption: 'Men\'s Crochet - Style 21' },
    { category: 'clothing', src: 'Images/Men/Men_Product (22).png', caption: 'Men\'s Crochet - Style 22' },
    { category: 'clothing', src: 'Images/Men/Men_Product (23).png', caption: 'Men\'s Crochet - Style 23' },
    { category: 'clothing', src: 'Images/Men/Men_Product (24).png', caption: 'Men\'s Crochet - Style 24' },
    { category: 'clothing', src: 'Images/Men/Men_Product (25).png', caption: 'Men\'s Crochet - Style 25' },
    { category: 'clothing', src: 'Images/Men/Men_Product (26).png', caption: 'Men\'s Crochet - Style 26' },
    { category: 'clothing', src: 'Images/Men/Men_Product (27).png', caption: 'Men\'s Crochet - Style 27' },

    // WOMEN & GIRLS (105 images)
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (1).png', caption: 'Women\'s Crochet - Style 1' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (2).png', caption: 'Women\'s Crochet - Style 2' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (3).png', caption: 'Women\'s Crochet - Style 3' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (4).png', caption: 'Women\'s Crochet - Style 4' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (5).png', caption: 'Women\'s Crochet - Style 5' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (6).png', caption: 'Women\'s Crochet - Style 6' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (7).png', caption: 'Women\'s Crochet - Style 7' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (8).png', caption: 'Women\'s Crochet - Style 8' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (9).png', caption: 'Women\'s Crochet - Style 9' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (10).png', caption: 'Women\'s Crochet - Style 10' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (11).png', caption: 'Women\'s Crochet - Style 11' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (12).png', caption: 'Women\'s Crochet - Style 12' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (13).png', caption: 'Women\'s Crochet - Style 13' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (14).png', caption: 'Women\'s Crochet - Style 14' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (15).png', caption: 'Women\'s Crochet - Style 15' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (16).png', caption: 'Women\'s Crochet - Style 16' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (17).png', caption: 'Women\'s Crochet - Style 17' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (18).png', caption: 'Women\'s Crochet - Style 18' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (19).png', caption: 'Women\'s Crochet - Style 19' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (20).png', caption: 'Women\'s Crochet - Style 20' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (21).png', caption: 'Women\'s Crochet - Style 21' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (22).png', caption: 'Women\'s Crochet - Style 22' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (23).png', caption: 'Women\'s Crochet - Style 23' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (24).png', caption: 'Women\'s Crochet - Style 24' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (25).png', caption: 'Women\'s Crochet - Style 25' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (26).png', caption: 'Women\'s Crochet - Style 26' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (27).png', caption: 'Women\'s Crochet - Style 27' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (28).png', caption: 'Women\'s Crochet - Style 28' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (29).png', caption: 'Women\'s Crochet - Style 29' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (30).png', caption: 'Women\'s Crochet - Style 30' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (31).png', caption: 'Women\'s Crochet - Style 31' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (32).png', caption: 'Women\'s Crochet - Style 32' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (33).png', caption: 'Women\'s Crochet - Style 33' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (34).png', caption: 'Women\'s Crochet - Style 34' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (35).png', caption: 'Women\'s Crochet - Style 35' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (36).png', caption: 'Women\'s Crochet - Style 36' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (37).png', caption: 'Women\'s Crochet - Style 37' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (38).png', caption: 'Women\'s Crochet - Style 38' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (39).png', caption: 'Women\'s Crochet - Style 39' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (40).png', caption: 'Women\'s Crochet - Style 40' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (41).png', caption: 'Women\'s Crochet - Style 41' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (42).png', caption: 'Women\'s Crochet - Style 42' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (43).png', caption: 'Women\'s Crochet - Style 43' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (44).png', caption: 'Women\'s Crochet - Style 44' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (45).png', caption: 'Women\'s Crochet - Style 45' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (46).png', caption: 'Women\'s Crochet - Style 46' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (47).png', caption: 'Women\'s Crochet - Style 47' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (48).png', caption: 'Women\'s Crochet - Style 48' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (49).png', caption: 'Women\'s Crochet - Style 49' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (50).png', caption: 'Women\'s Crochet - Style 50' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (51).png', caption: 'Women\'s Crochet - Style 51' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (52).png', caption: 'Women\'s Crochet - Style 52' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (53).png', caption: 'Women\'s Crochet - Style 53' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (54).png', caption: 'Women\'s Crochet - Style 54' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (55).png', caption: 'Women\'s Crochet - Style 55' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (56).png', caption: 'Women\'s Crochet - Style 56' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (57).png', caption: 'Women\'s Crochet - Style 57' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (58).png', caption: 'Women\'s Crochet - Style 58' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (59).png', caption: 'Women\'s Crochet - Style 59' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (60).png', caption: 'Women\'s Crochet - Style 60' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (61).png', caption: 'Women\'s Crochet - Style 61' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (62).png', caption: 'Women\'s Crochet - Style 62' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (63).png', caption: 'Women\'s Crochet - Style 63' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (64).png', caption: 'Women\'s Crochet - Style 64' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (65).png', caption: 'Women\'s Crochet - Style 65' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (66).png', caption: 'Women\'s Crochet - Style 66' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (67).png', caption: 'Women\'s Crochet - Style 67' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (68).png', caption: 'Women\'s Crochet - Style 68' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (69).png', caption: 'Women\'s Crochet - Style 69' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (70).png', caption: 'Women\'s Crochet - Style 70' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (71).png', caption: 'Women\'s Crochet - Style 71' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (72).png', caption: 'Women\'s Crochet - Style 72' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (73).png', caption: 'Women\'s Crochet - Style 73' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (74).png', caption: 'Women\'s Crochet - Style 74' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (75).png', caption: 'Women\'s Crochet - Style 75' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (76).png', caption: 'Women\'s Crochet - Style 76' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (77).png', caption: 'Women\'s Crochet - Style 77' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (78).png', caption: 'Women\'s Crochet - Style 78' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (79).png', caption: 'Women\'s Crochet - Style 79' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (80).png', caption: 'Women\'s Crochet - Style 80' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (81).png', caption: 'Women\'s Crochet - Style 81' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (82).png', caption: 'Women\'s Crochet - Style 82' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (83).png', caption: 'Women\'s Crochet - Style 83' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (84).png', caption: 'Women\'s Crochet - Style 84' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (85).png', caption: 'Women\'s Crochet - Style 85' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (86).png', caption: 'Women\'s Crochet - Style 86' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (87).png', caption: 'Women\'s Crochet - Style 87' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (88).png', caption: 'Women\'s Crochet - Style 88' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (89).png', caption: 'Women\'s Crochet - Style 89' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (90).png', caption: 'Women\'s Crochet - Style 90' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (91).png', caption: 'Women\'s Crochet - Style 91' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (92).png', caption: 'Women\'s Crochet - Style 92' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (93).png', caption: 'Women\'s Crochet - Style 93' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (94).png', caption: 'Women\'s Crochet - Style 94' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (95).png', caption: 'Women\'s Crochet - Style 95' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (96).png', caption: 'Women\'s Crochet - Style 96' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (97).png', caption: 'Women\'s Crochet - Style 97' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (98).png', caption: 'Women\'s Crochet - Style 98' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (99).png', caption: 'Women\'s Crochet - Style 99' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (100).png', caption: 'Women\'s Crochet - Style 100' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (101).png', caption: 'Women\'s Crochet - Style 101' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (102).png', caption: 'Women\'s Crochet - Style 102' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (103).png', caption: 'Women\'s Crochet - Style 103' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (104).png', caption: 'Women\'s Crochet - Style 104' },
    { category: 'clothing', src: 'Images/Women & Girls/W&G Product (105).png', caption: 'Women\'s Crochet - Style 105' },

    // HEADBAND & BATH GLOVES (18 images)
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (1).png', caption: 'Headband & Glove Set - Style 1' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (2).png', caption: 'Headband & Glove Set - Style 2' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (3).png', caption: 'Headband & Glove Set - Style 3' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (4).png', caption: 'Headband & Glove Set - Style 4' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (5).png', caption: 'Headband & Glove Set - Style 5' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (6).png', caption: 'Headband & Glove Set - Style 6' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (7).png', caption: 'Headband & Glove Set - Style 7' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (8).png', caption: 'Headband & Glove Set - Style 8' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (9).png', caption: 'Headband & Glove Set - Style 9' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (10).png', caption: 'Headband & Glove Set - Style 10' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (11).png', caption: 'Headband & Glove Set - Style 11' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (12).png', caption: 'Headband & Glove Set - Style 12' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (13).png', caption: 'Headband & Glove Set - Style 13' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (14).png', caption: 'Headband & Glove Set - Style 14' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (15).png', caption: 'Headband & Glove Set - Style 15' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (16).png', caption: 'Headband & Glove Set - Style 16' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (17).png', caption: 'Headband & Glove Set - Style 17' },
    { category: 'accessories', src: 'Images/Headband & Bath gloves/Head Product  (18).png', caption: 'Headband & Glove Set - Style 18' }
];

// Lightbox navigation variables
let currentLightboxIndex = 0;
let currentFilteredItems = [];

function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const filteredItems = filter === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);
    
    currentFilteredItems = filteredItems;
    
    galleryGrid.innerHTML = filteredItems.map((item, index) => `
        <div class="gallery-item" data-category="${item.category}" data-index="${index}" onclick="openLightbox(${index})">
            <img src="${item.src}" alt="${item.caption}" loading="lazy">
            <div class="gallery-overlay">
                <p>${item.caption}</p>
            </div>
        </div>
    `).join('');
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderGallery(this.dataset.filter);
    });
});

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (lightbox && lightboxImg && currentFilteredItems.length > 0) {
        currentLightboxIndex = index;
        const item = currentFilteredItems[index];
        
        lightboxImg.src = item.src;
        if (lightboxCaption) lightboxCaption.textContent = item.caption;
        if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${currentFilteredItems.length}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function navigateLightbox(direction) {
    if (currentFilteredItems.length === 0) return;
    
    let newIndex = currentLightboxIndex + direction;
    if (newIndex < 0) newIndex = currentFilteredItems.length - 1;
    if (newIndex >= currentFilteredItems.length) newIndex = 0;
    
    openLightbox(newIndex);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) navigateLightbox(1);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderGallery('all');
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// =========================================
// 10. BACK TO TOP BUTTON
// =========================================
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

console.log('✨ LUCKYCROCHET - All interactive features loaded successfully!');
console.log('📱 WhatsApp: +250790702735 | Currency: Rwf');