const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const seekSlider = document.getElementById('seekSlider');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const tryTTSBtn = document.getElementById('tryTTSBtn');

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateTime() {
    seekSlider.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
        `;
        playPauseBtn.setAttribute('aria-label', 'Pause audio');
    } else {
        audio.pause();
        playPauseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
        `;
        playPauseBtn.setAttribute('aria-label', 'Play audio');
    }
}

audio.addEventListener('loadedmetadata', () => {
    seekSlider.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', updateTime);
playPauseBtn.addEventListener('click', togglePlayPause);

seekSlider.addEventListener('input', () => {
    audio.currentTime = seekSlider.value;
});

audio.addEventListener('ended', () => {
    playPauseBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    `;
    playPauseBtn.setAttribute('aria-label', 'Play audio');
});

tryTTSBtn.addEventListener('click', () => {
    alert('This would typically open a TTS interface or start a TTS process.');
});