document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('countdownForm');
    const countdown = document.getElementById('countdown');
    const eventTitle = document.getElementById('eventTitle');
    const timer = document.getElementById('timer');
    const resetButton = document.getElementById('resetButton');
    const eventMessage = document.getElementById('eventMessage');
    const eventMessageText = document.getElementById('eventMessageText');
    let interval;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventLabel = document.getElementById('eventLabel').value;
        const eventDate = new Date(document.getElementById('eventDate').value);

        localStorage.setItem('eventLabel', eventLabel);
        localStorage.setItem('eventDate', eventDate);

        startCountdown(eventLabel, eventDate);
    });

    resetButton.addEventListener('click', () => {
        clearInterval(interval);
        localStorage.removeItem('eventLabel');
        localStorage.removeItem('eventDate');
        countdown.style.display = 'none';
        eventMessage.style.display = 'none'; // Hide the message when reset button is clicked
        form.reset();
    });

    function startCountdown(eventLabel, eventDate) {
        countdown.style.display = 'block';
        eventTitle.textContent = eventLabel;
        resetButton.classList.remove('hidden');
        eventMessage.classList.add('hidden');

        function updateTimer() {
            const now = new Date().getTime();
            const distance = eventDate.getTime() - now;

            if (distance <= 0) {
                clearInterval(interval);
                alert("The event has arrived!");
                return;
            }

            const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30));
            const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('months').textContent = formatTime(months);
            document.getElementById('weeks').textContent = formatTime(weeks);
            document.getElementById('days').textContent = formatTime(days);
            document.getElementById('hours').textContent = formatTime(hours);
            document.getElementById('minutes').textContent = formatTime(minutes);
            document.getElementById('seconds').textContent = formatTime(seconds);
        }

        updateTimer();
        interval = setInterval(updateTimer, 1000);
    }

    function formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    const savedEventLabel = localStorage.getItem('eventLabel');
    const savedEventDate = localStorage.getItem('eventDate');

    if (savedEventLabel && savedEventDate) {
        startCountdown(savedEventLabel, new Date(savedEventDate));
    }
});





 






