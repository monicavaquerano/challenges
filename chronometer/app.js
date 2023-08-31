document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const chronometer = document.querySelector('#chronometer');
    const btnStart = document.querySelector('#btn-start-stop');
    const btnRestart = document.querySelector('#btn-restart');

    // Events
    btnStart.addEventListener('click', (e) => {
        if (chronoStatus === 'paused') {
            chronoStatus = "started";
            interval = window.setInterval(() => {
                chronometer.innerText = updateChronometer()
            }, 1000);
            btnStart.innerHTML = '<i class="bi bi-pause-fill"></i>';
            btnStart.classList.remove('start');
            btnStart.classList.add('paused');
        } else {
            chronoStatus = "paused";
            window.clearInterval(interval);
            btnStart.innerHTML = '<i class="bi bi-play-fill"></i>';
            btnStart.classList.remove('paused');
            btnStart.classList.add('start');
        }
    });
    btnRestart.addEventListener('click', (e) => {
        window.clearInterval(interval);
        chronoStatus = "paused";
        seconds = 0;
        minutes = 0;
        hours = 0;
        chronometer.innerText = "00:00:00";
        btnStart.classList.remove('paused');
        btnStart.classList.add('start');
        btnStart.innerHTML = '<i class="bi bi-play-fill"></i>';
    });

});

let [hours, minutes, seconds] = [0, 0, 0];
let interval;
let chronoStatus = "paused";

function updateChronometer() {
    seconds++;

    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }

    const secondsFormat = format(seconds);
    const minutesFormat = format(minutes);
    const hoursFormat = format(hours);

    return `${hoursFormat}:${minutesFormat}:${secondsFormat}`
}

function format(unit) {
    return unit < 10 ? '0' + unit : unit;
}