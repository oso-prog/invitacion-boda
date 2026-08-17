document.addEventListener('DOMContentLoaded', () => {

    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const openBtn = document.getElementById('open-invitation-btn');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');
    let isPlaying = false;

    // 1. APERTURA DE INVITACIÓN + MÚSICA
    openBtn.addEventListener('click', () => {
        // Revela el contenido principal
        mainContent.classList.remove('hidden');

        // Transición de salida para la pantalla inicial
        welcomeScreen.classList.add('fade-out');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
        }, 800);

        // Reproduce el audio (superando las restricciones del navegador)
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log("Autoplay restringido por el navegador:", error);
        });
    });

    // 2. CONTROL MANUAL DE MÚSICA
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    // 3. CUENTA REGRESIVA
    const weddingDate = new Date('September 12, 2026 17:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. FORMULARIO RSVP POR WHATSAPP
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = rsvpForm.querySelector('input[type="text"]').value;
            const attendance = rsvpForm.querySelector('select').value;
            const guests = rsvpForm.querySelector('input[type="number"]').value || '0';

            const phone = "5491166749866"; // Reemplaza con tu número de teléfono
            const message = `Hola, soy ${name}. Confirmación de asistencia: ${attendance.toUpperCase()}. Acompañantes: ${guests}.`;
            
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        });
    }
});