// Epic Games Security Education Site - JavaScript

// Global variables
let currentStep = 1;
let testProgress = 0;
let currentPurchaseItem = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case '2fa.html':
            initialize2FA();
            break;
        case 'security-test.html':
            initializeSecurityTest();
            break;
        case 'store.html':
            initializeStore();
            break;
        case 'hacked.html':
            initializeHackedPage();
            break;
        default:
            initializeHomePage();
    }
}

// Home page initialization
function initializeHomePage() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 2FA page functionality
function initialize2FA() {
    // Initialize step indicator
    updateStepIndicator(1);
}

function nextStep(step) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.add('hidden');
    
    // Show next step
    document.getElementById(`step-${step}`).classList.remove('hidden');
    
    // Update step indicator
    updateStepIndicator(step);
    
    currentStep = step;
    
    // Special handling for step 2
    if (step === 2) {
        // Simulate QR code generation delay
        setTimeout(() => {
            console.log('QR Code generated for 2FA setup');
        }, 500);
    }
    
    // Special handling for step 3 (success)
    if (step === 3) {
        // Simulate 2FA activation
        setTimeout(() => {
            showNotification('2FA ativado com sucesso!', 'success');
        }, 500);
    }
}

function updateStepIndicator(activeStep) {
    document.querySelectorAll('.step-item').forEach((item, index) => {
        const stepNumber = index + 1;
        if (stepNumber <= activeStep) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Security test functionality
function initializeSecurityTest() {
    // Initialize progress
    updateProgress(0);
    
    // Add click tracking for legitimate content
    document.querySelectorAll('.skin-card.legitimate').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            proceedToStore();
        });
    });
    
    // Add hover effects for traps
    document.querySelectorAll('.fake-ad, .fake-captcha, .fake-notification, .fake-download, .fake-survey, .fake-login').forEach(trap => {
        trap.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 20px rgba(255, 71, 87, 0.5)';
        });
        
        trap.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

function showHackedMessage() {
    // Redirect to hacked page
    window.location.href = 'hacked.html';
}

function proceedToStore() {
    // Update progress
    updateProgress(100);
    
    // Show success message
    setTimeout(() => {
        document.getElementById('success-area').classList.remove('hidden');
        document.querySelector('.legitimate-content').scrollIntoView({
            behavior: 'smooth'
        });
        showNotification('Parabéns! Você evitou todas as armadilhas!', 'success');
    }, 500);
}

function updateProgress(percentage) {
    testProgress = percentage;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = percentage + '% Completo';
    }
}

// Store functionality
function initializeStore() {
    // Initialize filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            filterStoreItems(filter);
        });
    });
}

function filterStoreItems(filter) {
    document.querySelectorAll('.store-item').forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function purchaseItem(itemId, price) {
    currentPurchaseItem = {
        id: itemId,
        price: price,
        name: getItemName(itemId)
    };
    
    // Populate purchase modal
    const itemInfo = document.getElementById('purchase-item-info');
    itemInfo.innerHTML = `
        <div class="purchase-item-details">
            <h3>${currentPurchaseItem.name}</h3>
            <p class="item-price">${price} V-Bucks</p>
        </div>
    `;
    
    // Update totals
    document.getElementById('subtotal').textContent = price + ' V-Bucks';
    document.getElementById('total').textContent = price + ' V-Bucks';
    
    // Show modal
    document.getElementById('purchase-modal').classList.remove('hidden');
}

function getItemName(itemId) {
    const itemNames = {
        'warrior-skin': 'Skin Épica do Guerreiro',
        'hero-skin': 'Skin do Super Herói',
        'ninja-skin': 'Skin do Ninja Sombrio',
        'victory-dance': 'Dança da Vitória',
        'epic-emote': 'Emote Épico',
        'dragon-pickaxe': 'Picareta do Dragão'
    };
    return itemNames[itemId] || 'Item Desconhecido';
}

function closePurchaseModal() {
    document.getElementById('purchase-modal').classList.add('hidden');
    currentPurchaseItem = null;
}

function confirmPurchase() {
    if (!currentPurchaseItem) return;
    
    // Close purchase modal
    closePurchaseModal();
    
    // Show success modal
    setTimeout(() => {
        document.getElementById('success-modal').classList.remove('hidden');
        showNotification('Compra realizada com sucesso!', 'success');
    }, 300);
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
}

// Hacked page functionality
function initializeHackedPage() {
    // Add glitch effect to title
    const title = document.querySelector('.hacked-title');
    if (title) {
        setInterval(() => {
            title.classList.add('glitch');
            setTimeout(() => {
                title.classList.remove('glitch');
            }, 200);
        }, 3000);
    }
    
    // Add shake effect to icon
    const icon = document.querySelector('.hacked-icon');
    if (icon) {
        setInterval(() => {
            icon.style.animation = 'none';
            setTimeout(() => {
                icon.style.animation = 'shake 0.5s infinite';
            }, 50);
        }, 5000);
    }
}

function restartSession() {
    // Clear any stored progress
    testProgress = 0;
    currentStep = 1;
    
    // Show loading effect
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Reiniciando...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Redirect to security test
        window.location.href = 'security-test.html';
    }, 1500);
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌',
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        'success': '#00ff88',
        'error': '#ff4757',
        'warning': '#ffaa00',
        'info': '#0078f2'
    };
    return colors[type] || colors.info;
}

function closeNotification(closeBtn) {
    const notification = closeBtn.closest('.notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            modal.classList.add('hidden');
        });
    }
    
    // Ctrl+R to restart (on hacked page)
    if (e.ctrlKey && e.key === 'r' && window.location.pathname.includes('hacked.html')) {
        e.preventDefault();
        restartSession();
    }
});

// Prevent right-click context menu on fake elements (educational purpose)
document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.fake-ad, .fake-captcha, .fake-notification, .fake-download, .fake-survey, .fake-login')) {
        e.preventDefault();
        showNotification('Cuidado! Este elemento é suspeito.', 'warning');
    }
});

// Track user interactions for educational purposes
let userInteractions = {
    trapsClicked: 0,
    legitimateClicks: 0,
    timeSpent: 0
};

// Start time tracking
const startTime = Date.now();

// Track trap clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.fake-ad, .fake-captcha, .fake-notification, .fake-download, .fake-survey, .fake-login, .skin-card.fake')) {
        userInteractions.trapsClicked++;
        console.log('Trap clicked:', userInteractions.trapsClicked);
    } else if (e.target.closest('.skin-card.legitimate, .btn-primary')) {
        userInteractions.legitimateClicks++;
        console.log('Legitimate action:', userInteractions.legitimateClicks);
    }
});

// Update time spent
setInterval(() => {
    userInteractions.timeSpent = Math.floor((Date.now() - startTime) / 1000);
}, 1000);

// Console warning for developers
console.log('%c🛡️ Epic Games Security Education Site', 'color: #0078f2; font-size: 20px; font-weight: bold;');
console.log('%cEste é um site educativo sobre segurança online.', 'color: #00ff88; font-size: 14px;');
console.log('%cNão forneça informações reais neste ambiente de teste.', 'color: #ffaa00; font-size: 12px;');

// Export functions for global access
window.nextStep = nextStep;
window.showHackedMessage = showHackedMessage;
window.proceedToStore = proceedToStore;
window.purchaseItem = purchaseItem;
window.closePurchaseModal = closePurchaseModal;
window.confirmPurchase = confirmPurchase;
window.closeSuccessModal = closeSuccessModal;
window.restartSession = restartSession;
window.closeNotification = closeNotification;
