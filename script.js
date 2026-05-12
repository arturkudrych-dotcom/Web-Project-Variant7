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

window.addEventListener('load', () => {
    const progress = document.getElementById('progress-fill');
    const loader = document.getElementById('loader-overlay');
    
    // 1. Починаємо заповнення смужки
    setTimeout(() => {
        progress.style.width = '100%';
    }, 100);

    // 2. Коли смужка заповнилась, прибираємо заставку
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // 3. Запускаємо почергову появу блоків
            revealSections();
        }, 800);
    }, 1800);
});

function revealSections() {
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('visible');
        }, index * 400); // Кожен наступний блок з'являється через 0.4 сек
    });
}

const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
const starCount = 150; // Кількість зірок

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Створюємо об'єкти зірок
for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02 // Швидкість мерехтіння
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff"; // акцентний колір для зірок

    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Ефект мерехтіння
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) {
            star.speed = -star.speed;
        }
    });

    requestAnimationFrame(drawStars);
}

drawStars();

const logContainer = document.getElementById('log-container');

// База повідомлень (радіотехнічна тематика)
const logMessages = [
    { text: "Receiving encrypted telemetry from Voyager-1", type: "info" },
    { text: "Signal-to-noise ratio: 12.4dB (STABLE)", type: "info" },
    { text: "Adjusting deep space antenna azimuth... Done", type: "info" },
    { text: "Packet loss detected in Sector X-2026", type: "warn" },
    { text: "Synchronizing atomic clock with UzhNU station", type: "info" },
    { text: "Decoding QPSK modulation sequence", type: "info" },
    { text: "Solar flare interference detected. Re-routing signal", type: "warn" },
    { text: "New object identified in Sector B-4", type: "info" }
];

function addLog() {
    const time = new Date().toLocaleTimeString();
    const message = logMessages[Math.floor(Math.random() * logMessages.length)];
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    
    const typeClass = message.type === 'warn' ? 'log-msg-warn' : 'log-msg-info';
    
    entry.innerHTML = `
        <span class="log-time">[${time}]</span>
        <span class="${typeClass}">> ${message.text}</span>
    `;
    
    logContainer.prepend(entry); // Додаємо зверху

    // Видаляємо застарілі рядки, щоб не перевантажувати пам'ять
    if (logContainer.childNodes.length > 8) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Запускаємо потік (новий лог кожні 3-5 секунд)
setInterval(addLog, 3500);

// Додаємо перший лог відразу при завантаженні
addLog();