document.addEventListener('DOMContentLoaded', () => {
    console.log("Всі космічні системи моніторингу активовані!");

    // --- 1. МОДАЛЬНЕ ВІКНО ДЛЯ ФОТО (НАЙНАДІЙНІША ВЕРСІЯ) ---
    // Ми створюємо модалку динамічно, щоб вона не залежала від CSS файлу
    
    // Створюємо фон модалки
    const modal = document.createElement('div');
    modal.id = 'dynamic-modal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 99999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
    `;

    // Створюємо картинку всередині
    const modalImg = document.createElement('img');
    modalImg.id = 'modal-img';
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border: 2px solid #66fcf1;
        box-shadow: 0 0 25px rgba(102, 252, 241, 0.5);
        display: block;
        margin: auto;
    `;

    // Створюємо хрестик
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 35px;
        color: #66fcf1;
        font-size: 50px;
        font-weight: bold;
        cursor: pointer;
        z-index: 100000;
    `;

    // Збираємо все докупи
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Шукаємо геть усі картинки на сторінці
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(img => {
        // Додаємо можливість кліку тільки для великих картинок (пропускаємо іконки)
        if (img.id !== 'modal-img' && img.width > 50) { 
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // щоб клік не спрацював на фоні
                modal.style.display = 'flex'; // показуємо модалку
                modalImg.src = img.src; // переносимо шлях до фото
            });
        }
    });

    // Закриття при кліку на хрестик АБО на будь-яке місце фону
    const closeModal = () => { modal.style.display = 'none'; };
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    // Також закриваємо при натисканні Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });


    // --- 2. ГРАФІК-ОСЦИЛОГРАФ (БЕЗ ЗМІН) ---
    const canvas = document.getElementById('oscilloscope');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let offset = 0;

    function drawOscilloscope() {
        if (!canvas || !ctx) return;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(102, 252, 241, 0.1)';
        for(let i = 0; i < canvas.width; i += 50) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#66fcf1';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#66fcf1';

        for (let x = 0; x < canvas.width; x++) {
            const amplitude = canvas.height * 0.25;
            const frequency = 0.02;
            const noise = (Math.random() - 0.5) * 4;
            const y = canvas.height / 2 + Math.sin(x * frequency + offset) * amplitude + noise;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        offset += 0.08;
        requestAnimationFrame(drawOscilloscope);
    }


    // --- 3. ДИНАМІЧНІ ДАНІ (БЕЗ ЗМІН) ---
    function updateTelemetry() {
        // Оновлення затримки сигналу
        const delayEl = document.getElementById('signal-delay');
        if (delayEl) {
            delayEl.innerText = (14 + Math.random()).toFixed(1) + " мс";
        }

        // Оновлення частот у таблиці
        const baseFreqs = {
            'freq-earth': 14.15,
            'freq-mars': 8.42,
            'freq-voyager': 2.30
        };

        for (let id in baseFreqs) {
            const el = document.getElementById(id);
            if (el) {
                const fluctuation = (Math.random() * 0.04 - 0.02).toFixed(2);
                const newValue = (baseFreqs[id] + parseFloat(fluctuation)).toFixed(2);
                el.innerText = `${newValue} GHz`;
            }
        }

        // Оновлення смужок потужності
        document.querySelectorAll('.power-bar').forEach(bar => {
            const val = Math.floor(Math.random() * 60) + 35; // 35-95%
            bar.style.width = val + "%";
            bar.style.backgroundColor = val < 40 ? "#ff4b2b" : "#66fcf1";
        });
    }

    // Запуск систем
    if (canvas) drawOscilloscope();
    setInterval(updateTelemetry, 2500); // Оновлення даних кожні 2.5 сек
});

document.addEventListener('DOMContentLoaded', function() {
    // Весь твій код (window.onscroll, функції тощо) помісти сюди
    console.log("Система готова до моніторингу!");
});

// Оновлена функція виводу даних
function showInfo(id, name, dist, freq, status) {
    const panel = document.getElementById('target-details');
    if (panel) {
        panel.innerHTML = `
            <div style="animation: fadeIn 0.5s">
                <p class="detail-row"><span class="detail-label">ID:</span> ${id}</p>
                <p class="detail-row"><span class="detail-label">OBJECT:</span> ${name}</p>
                <p class="detail-row"><span class="detail-label">DISTANCE:</span> ${dist}</p>
                <p class="detail-row"><span class="detail-label">FREQ:</span> ${freq}</p>
                <p class="detail-row"><span class="detail-label">STATUS:</span> <span style="color: ${status === 'WEAK' ? '#ff4d4d' : '#00ff88'}">${status}</span></p>
                <hr style="border: 0; border-top: 1px solid rgba(102, 252, 241, 0.2); margin: 15px 0;">
                
                <button onclick="showSignalModal('${name}')" class="terminal-btn">Відправити сигнал</button>
            </div>
        `;
    }
}

// Функція відкриття модалки
function showSignalModal(targetName) {
    const modal = document.getElementById('signal-modal');
    const text = document.getElementById('signal-status-text');
    
    text.innerText = `СИГНАЛ УСПІШНО ВІДПРАВЛЕНО НА: ${targetName}`;
    modal.style.display = 'flex';
}

// Функція закриття
function closeSignalModal() {
    document.getElementById('signal-modal').style.display = 'none';
}