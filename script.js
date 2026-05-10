// Коли користувач прокручує сторінку, виконується функція
window.onscroll = function() {
    updateScrollIndicator();
};

function updateScrollIndicator() {
    // Отримуємо значення прокрутки
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Отримуємо загальну висоту документа мінус висоту вікна
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Вираховуємо відсоток
    let scrolled = (winScroll / height) * 100;
    
    // Змінюємо ширину індикатора
    document.getElementById("myBar").style.width = scrolled + "%";
}