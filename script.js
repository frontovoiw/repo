// Эффект курсора
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Эффект при наведении на кнопки и ссылки
const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.border = '1px solid var(--accent-color)';
        cursor.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
    });

    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.border = '2px solid var(--accent-color)';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Эффект появления элементов при прокрутке
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Симбиотический эффект при движении мыши
const symbioteEffect = document.querySelector('.symbiote-effect');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    symbioteEffect.style.background = `
        radial-gradient(
            circle at ${x * 100}% ${y * 100}%,
            transparent 0%,
            rgba(0,255,0,0.1) 100%
        )
    `;
});

// Форма обратной связи
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Здесь можно добавить логику отправки формы
    alert('Сообщение отправлено!');
    contactForm.reset();
});

// Проверка авторизации
let isAuthenticated = false;
let userInfo = null;

// Функция проверки состояния авторизации
async function checkAuth() {
    try {
        const response = await fetch('check_auth.php');
        const data = await response.json();
        
        if (data.authenticated) {
            isAuthenticated = true;
            userInfo = data.user;
            updateUserInterface();
        }
    } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
    }
}

// Обновление интерфейса после авторизации
function updateUserInterface() {
    const loginBtn = document.querySelector('.login-btn');
    
    if (isAuthenticated && userInfo) {
        // Создаем меню пользователя
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <img src="${userInfo.avatar}" alt="${userInfo.name}" class="user-avatar">
            <span class="user-name">${userInfo.name}</span>
            <div class="user-dropdown">
                <a href="#profile">Профиль</a>
                <a href="#inventory">Инвентарь</a>
                <a href="#orders">Заказы</a>
                <a href="logout.php">Выйти</a>
            </div>
        `;
        
        // Заменяем кнопку входа на меню пользователя
        loginBtn.replaceWith(userMenu);
    } else {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'steam_auth.php';
        });
    }
}

// Корзина
let cart = [];
const cartCount = document.querySelector('.cart-count');

// Функция обновления счетчика корзины
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Добавление товара в корзину
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (!isAuthenticated) {
            alert('Пожалуйста, войдите через Steam для совершения покупок');
            return;
        }

        const product = e.target.closest('.product-card');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;
        
        cart.push({
            name: productName,
            price: productPrice
        });
        
        updateCartCount();
        
        // Анимация добавления в корзину
        button.textContent = '✓ В корзине';
        button.style.background = '#00ff00';
        
        setTimeout(() => {
            button.textContent = 'Купить';
            button.style.background = 'var(--accent-color)';
        }, 1500);
    });
});

// Фильтрация товаров
const filterButtons = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.textContent.toLowerCase();
        
        products.forEach(product => {
            if (category === 'все') {
                product.style.display = 'block';
            } else {
                const productCategory = product.querySelector('h3').textContent.toLowerCase();
                if (productCategory.includes(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            }
        });
    });
});

// Открытие кейсов
document.querySelectorAll('.open-case-btn').forEach(button => {
    button.addEventListener('click', () => {
        if (!isAuthenticated) {
            alert('Пожалуйста, войдите через Steam для открытия кейсов');
            return;
        }

        const caseCard = button.closest('.case-card');
        const caseName = caseCard.querySelector('h3').textContent;
        
        // Анимация открытия кейса
        button.textContent = 'Открывается...';
        button.disabled = true;
        
        // Имитация процесса открытия кейса
        setTimeout(() => {
            const items = [
                'AK-47 | Dragon', 
                'M4A4 | Howl', 
                'Нож | Fade',
                'AWP | Dragon Lore'
            ];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            
            alert(`Поздравляем! Вы получили: ${randomItem} из ${caseName}!`);
            
            button.textContent = 'Открыть кейс';
            button.disabled = false;
        }, 2000);
    });
});

// Анимация при наведении на карточки товаров
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(255, 77, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Инициализация проверки авторизации при загрузке страницы
checkAuth(); 