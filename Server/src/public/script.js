// Live Time Update
function updateLiveTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeElement = document.getElementById('live-time');
    if (timeElement) {
        timeElement.textContent = `🕐 ${hours}:${minutes}:${seconds}`;
    }
}

setInterval(updateLiveTime, 1000);
updateLiveTime();

// Service Card Hover Effects
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0.4';
        }
    });

    card.addEventListener('mouseleave', function () {
        const glow = this.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});

// Console Button Click Tracking
const consoleButtons = document.querySelectorAll('.console-btn');

consoleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
        const serviceName = this.querySelector('span:nth-child(2)').textContent;
        console.log(`%c[ACCESS] Opening: ${serviceName}`, 'color: #00ff88; font-weight: bold;');

        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '5px';
        ripple.style.height = '5px';
        ripple.style.background = 'rgba(0, 255, 136, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(40);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// File Tab Switching
const fileTabs = document.querySelectorAll('.file-tab');

fileTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        fileTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        console.log(`%c[EDITOR] Switched to: ${this.textContent}`, 'color: #00d4ff;');
    });
});

// Scroll Animation for Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Matrix Rain Effect Enhancement
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';

    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(10, 14, 23, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Uncomment to enable matrix rain effect
// createMatrixRain();

// Terminal Cursor Blink
const cursor = document.querySelector('.cursor');
if (cursor) {
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for quick search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('%c[SHORTCUT] Quick search activated (Ctrl+K)', 'color: #00ff88; font-weight: bold;');
    }

    // Ctrl/Cmd + / for help
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        console.log('%c[HELP] Keyboard Shortcuts:\n- Ctrl+K: Quick Search\n- Ctrl+/: Help\n- Ctrl+D: Toggle Theme', 'color: #00d4ff; font-weight: bold;');
    }
});

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    const resources = performance.getEntriesByType('resource').length;

    console.log(`%c
    ╔════════════════════════════════════════════╗
    ║  🚀 KENSHI WEBSPACE BACKEND PORTAL        ║
    ║                                            ║
    ║  Status: ✅ ONLINE                         ║
    ║  Load Time: ${loadTime.toFixed(2)}ms                    ║
    ║  Resources: ${resources}                            ║
    ║  Version: 2.0.1                            ║
    ║                                            ║
    ║  🔐 Authorized Access Only                 ║
    ╚════════════════════════════════════════════╝
    `, 'color: #00ff88; font-family: monospace; font-size: 12px;');
});

// Service Status Simulation
function updateServiceStatus() {
    const services = ['vercel', 'aiven', 'render', 'clerk', 'cloudinary'];
    const statusIndicators = {
        vercel: '▲',
        aiven: '◆',
        render: '◉',
        clerk: '◐',
        cloudinary: '☁'
    };

    services.forEach(service => {
        const card = document.querySelector(`[data-category*="${service}"]`);
        if (card) {
            const badge = card.querySelector('.badge');
            if (badge) {
                // Simulate online status
                badge.style.animation = 'pulse 2s infinite';
            }
        }
    });
}

updateServiceStatus();

// Add subtle parallax effect to cards
let ticking = false;

document.addEventListener('mousemove', (e) => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            serviceCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = (e.clientX - centerX) / 50;
                const deltaY = (e.clientY - centerY) / 50;

                const glow = card.querySelector('.card-glow');
                if (glow) {
                    glow.style.background = `radial-gradient(circle at ${50 + deltaX}% ${50 + deltaY}%, var(--glow-green), transparent 70%)`;
                }
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
        console.log('%c⚔️ Developer Mode: ENGAGED', 'color: #00d4ff; font-size: 16px;');

        // Add special effect
        document.body.style.animation = 'rainbow 3s linear';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }
});

// Add rainbow animation CSS
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Log navigation
console.log('%c💻 Developer Tools Active', 'color: #00ff88; font-size: 14px; font-weight: bold;');
console.log('%cTip: Use Ctrl+K for quick navigation', 'color: #9ca3af; font-size: 12px;');