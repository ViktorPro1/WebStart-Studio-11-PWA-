//  Плавна анімація при появі секцій

const sections = document.querySelectorAll("section");

const reveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < triggerBottom) {
            section.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);


// 🌙 Темна тема

const toggle = document.getElementById("darkModeToggle");
const body = document.body;

// Перевіряємо тему при завантаженні
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (toggle) toggle.checked = true;
}

// Слухач на перемикач
if (toggle) {
    toggle.addEventListener("change", () => {
        body.classList.toggle("dark-mode");
        const theme = body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });
}

// Акція 

function startCountdown() {
    const countdown = document.getElementById("countdown");

    // Перевірка, чи існує елемент countdown
    if (!countdown) {
        console.error("Елемент countdown не знайдений!");
        return;
    }

    const deadline = new Date(2025, 6, 27, 23, 59, 59); // Дата: 27 липня 2025 року

    function updateCountdown() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            countdown.innerHTML = "Час вийшов!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdown.innerHTML = `До кінця акції: ${days}д ${hours}г ${minutes}хв ${seconds}сек`;
    }

    // Оновлюємо відлік кожну секунду
    setInterval(updateCountdown, 1000);
}

// Запуск функції при завантаженні сторінки
document.addEventListener("DOMContentLoaded", startCountdown);

// Привітальне вікно

// Закрити модальне вікно через 5 секунд після завантаження сторінки
setTimeout(function () {
    document.getElementById('welcome-modal').style.display = 'none';
}, 5000); // 5000 мілісекунд = 5 секунд

// Закрити модальне вікно при натисканні на хрестик
document.getElementById('close-btn').addEventListener('click', function () {
    document.getElementById('welcome-modal').style.display = 'none';
});


// Вікно допомоги

window.addEventListener('load', function () {
    setTimeout(function () {
        document.getElementById('popup').style.display = 'block';
    }, 8000); // Вікно з'явиться через 8 секунд

    document.getElementById('close-popup').addEventListener('click', function () {
        document.getElementById('popup').style.display = 'none';
    });
});


// Створення спостерігача для фото(відгуки клієнтів)
const photos = document.querySelectorAll('.testimonial-photo');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Додаємо клас "visible" для анімації
            observer.unobserve(entry.target); // Прибираємо спостереження після того, як елемент став видимим
        }
    });
}, {
    threshold: 0.5 // Фото має бути на 50% видимим для запуску анімації
});

// Спостерігаємо за кожним фото
photos.forEach(photo => {
    observer.observe(photo);
});

// Відгуки клієнтів

const testimonialsData = {
    testimonial1: [
        {
            img: "foto/elena.jpg",
            alt: "Олена",
            text: "Всього за три дні отримала повноцінне портфоліо. Стильний дизайн, адаптивність — усе на рівні!",
            cite: "— Олена, маркетолог"
        },
        {
            img: "foto/nadija.png",
            alt: "Надія",
            text: "Робота виконана якісно та швидко. Дизайн мені дуже підійшов. Рекомендую усім фрілансерам!",
            cite: "— Надія, фрілансер"
        },
        {
            img: "foto/volodumer.jpg",
            alt: "Володимир",
            text: "Мій лендінг виглядає професійно і привабливо — чудове рішення для будівельного бізнесу!",
            cite: "— Володимир, власник будівельної фірми"
        }
    ],
    testimonial2: [
        {
            img: "foto/andrew.jpg",
            alt: "Андрій",
            text: "Отримав сучасний сайт для магазину за рекордні строки. Робота перевершила очікування!",
            cite: "— Андрій, власник онлайн-магазину"
        },
        {
            img: "foto/vika.jpg",
            alt: "Віка",
            text: "Лендінг зробили за два дні! Стильно, зрозуміло, і клієнтам подобається. Я задоволена!",
            cite: "— Віка, власниця перукарні"
        },
        {
            img: "foto/sergey.jpg",
            alt: "Сергій",
            text: "Після запуску сайту заявки почали приходити відразу. Дуже ефективно!",
            cite: "— Сергій, фермер"
        }
    ],
    testimonial3: [
        {
            img: "foto/mary.jpg",
            alt: "Марія",
            text: "Після отримання електронного резюме мене запросили одразу на кілька співбесід. Дуже вдячна!",
            cite: "— Марія, шукачка роботи"
        },
        {
            img: "foto/bogdan.jpg",
            alt: "Богдан",
            text: "Резюме виконане професійно. Подача, структура — все на високому рівні. Отримав нову посаду!",
            cite: "— Богдан, рекрутер"
        },
        {
            img: "foto/sofia.jpg",
            alt: "Софія",
            text: "Сайт портфоліо зроблений з креативом і смаком. Замовлятиму ще банери й сторінки!",
            cite: "— Софія, маркетолог"
        }
    ]
};

function rotateTestimonials(id) {
    const container = document.getElementById(id);
    const data = testimonialsData[id];
    let index = 0;
    setInterval(() => {
        index = (index + 1) % data.length;
        const t = data[index];
        container.querySelector('img').src = t.img;
        container.querySelector('img').alt = t.alt;
        container.querySelector('.testimonial-content p').textContent = t.text;
        container.querySelector('.testimonial-content cite').textContent = t.cite;
    }, 20000); // змінюємо кожні 20 секунд
}

rotateTestimonials('testimonial1');
rotateTestimonials('testimonial2');
rotateTestimonials('testimonial3');

// Поділитись платформою

function share(network) {
    const url = encodeURIComponent('https://scintillating-sunshine-94e986.netlify.app/');
    const text = encodeURIComponent('WebStart Studio!');

    let shareUrl = '';

    switch (network) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
            break;
        case 'viber':
            // Viber не має прямого посилання для шерингу, можна запропонувати копіювання URL або відкрити чат
            alert('Щоб поділитись у Viber, скопіюйте посилання: ' + decodeURIComponent(url));
            return;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
        case 'messenger':
            shareUrl = `fb-messenger://share/?link=${url}`;
            break;
        default:
            alert('Соцмережа не підтримується');
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Вартість

const toggleBtn = document.getElementById('togglePricing');
const pricingTable = document.getElementById('pricingTable');
const linkWrapper = document.getElementById('linkWrapper');

toggleBtn.addEventListener('click', () => {
    const isVisible = pricingTable.style.display === 'table';
    if (isVisible) {
        pricingTable.style.display = 'none';
        linkWrapper.style.display = 'none';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = 'тут';
    } else {
        pricingTable.style.display = 'table';
        linkWrapper.style.display = 'block';
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.textContent = 'приховати';
    }
});



// Кількість переглядів

// const counterElement = document.getElementById('view-counter');

// // Ключ сайту (можна зробити унікальним)
// const namespace = 'webstart-studio';
// const key = 'visits';

// // Збільшуємо лічильник + отримуємо нове значення
// fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
//     .then(res => res.json())
//     .then(data => {
//         animateCount(data.value);
//     });

// function animateCount(targetValue) {
//     const duration = 2000;
//     const stepTime = 15;
//     let current = 0;
//     const increment = Math.ceil(targetValue / (duration / stepTime));

//     const interval = setInterval(() => {
//         current += increment;
//         if (current >= targetValue) {
//             current = targetValue;
//             clearInterval(interval);
//         }
//         counterElement.textContent = current;
//     }, stepTime);
// }

// fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
//     .then(res => res.json())
//     .then(data => console.log(data));
