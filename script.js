// --- Існуючий код: Scroll Indicator ---
window.onscroll = function() {
    updateScrollIndicator();
};

function updateScrollIndicator() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}


// --- НОВИЙ КОД: Повноекранне зображення (Модальне вікно) ---

// 1. Отримуємо елементи
// Оригінальне зображення
const originalImg = document.querySelector('.image-box img');
// Модальне вікно
const modal = document.getElementById('imageModal');
// Зображення в модальному вікні
const modalImg = document.getElementById('img01');
// Кнопка закриття (хрестик)
const span = document.getElementsByClassName('close')[0];

// 2. Функція для ВІДКРИТТЯ модального вікна
function openModal() {
    modal.classList.add('open'); // Додаємо клас для показу
    modalImg.src = originalImg.src; // Копіюємо джерело оригінального зображення
    document.body.style.overflow = 'hidden'; // Вимикаємо прокрутку основної сторінки
}

// 3. Функція для ЗАКРИТТЯ модального вікна
function closeModal() {
    modal.classList.remove('open'); // Видаляємо клас для показу
    document.body.style.overflow = 'auto'; // Повертаємо прокрутку сторінки
}

// 4. Додаємо обробники подій
// Відкрити при кліку на оригінальне зображення
if (originalImg) {
    originalImg.addEventListener('click', openModal);
}

// Закрити при кліку на хрестик
if (span) {
    span.addEventListener('click', closeModal);
}

// ДОДАТКОВО: Закрити при кліку в будь-яке місце на фоні (поза зображенням)
modal.addEventListener('click', function(event) {
    if (event.target === modal) { // Перевіряємо, що клік був на фоні, а не на картинці
        closeModal();
    }
});