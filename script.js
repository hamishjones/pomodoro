let timer;
let overallTimer;
let isWorkTime = true;
let workMinutes;
let breakMinutes;
let repeats;
let currentRepeat = 0;
let timeRemaining;
let overallTime = 0;
let isPaused = false;

function startTimer() {
    workMinutes = parseInt(document.getElementById('workTime').value) * 60;
    breakMinutes = parseInt(document.getElementById('breakTime').value) * 60;
    repeats = parseInt(document.getElementById('repeats').value);
    currentRepeat = 0;
    isWorkTime = true;
    timeRemaining = workMinutes;
    isPaused = false;
    overallTime = 0;

    document.body.classList.add('work');
    document.body.classList.remove('break');
    document.getElementById('message').innerText = "Work Time!";
    updateTimerDisplay();
    updateOverallTimerDisplay();
    timer = setInterval(countDown, 1000);
    overallTimer = setInterval(trackOverallTime, 1000);
}

function countDown() {
    if (isPaused) return;

    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
    } else {
        if (isWorkTime) {
            isWorkTime = false;
            timeRemaining = breakMinutes;
            document.body.classList.remove('work');
            document.body.classList.add('break');
            document.getElementById('message').innerText = "Break Time!";
        } else {
            currentRepeat++;
            if (currentRepeat < repeats) {
                isWorkTime = true;
                timeRemaining = workMinutes;
                document.body.classList.remove('break');
                document.body.classList.add('work');
                document.getElementById('message').innerText = "Work Time!";
            } else {
                clearInterval(timer);
                clearInterval(overallTimer);
                document.getElementById('message').innerText = "Pomodoro Complete!";
                return;
            }
        }
        updateTimerDisplay();
    }
}

function trackOverallTime() {
    if (isPaused) return;
    overallTime++;
    updateOverallTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updateOverallTimerDisplay() {
    const overallMinutes = Math.floor(overallTime / 60);
    const overallSeconds = overallTime % 60;
    document.getElementById('overallTimerDisplay').innerText = `Overall Time: ${overallMinutes < 10 ? '0' : ''}${overallMinutes}:${overallSeconds < 10 ? '0' : ''}${overallSeconds}`;
}

function pauseTimer() {
    isPaused = !isPaused;
    document.getElementById('message').innerText = isPaused ? "Paused" : (isWorkTime ? "Work Time!" : "Break Time!");
}

function stopTimer() {
    clearInterval(timer);
    clearInterval(overallTimer);
    document.getElementById('timerDisplay').innerText = "00:00";
    document.getElementById('overallTimerDisplay').innerText = "Overall Time: 00:00";
    document.getElementById('message').innerText = "Stopped";
    document.body.classList.remove('work', 'break');
}