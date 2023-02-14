const container = document.querySelector('.container');
const controls = document.querySelector('#controls');

// song information
const image = document.querySelector('#music-image');
const audio = document.querySelector('#audio');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
// song information

// controls button
const play = document.querySelector('#controls #play');
const prev = document.querySelector('#controls #prev');
const next = document.querySelector('#controls #next');
// controls button

// times
const currentTime = document.querySelector('#current-time');
const duration = document.querySelector('#duration');
// times

// volume
const volumeControls = controls.children[1];
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
// volume

const progressBar = document.querySelector('#progress-bar');
const player = new MusicPlayer(musicList);

// sayfa açıldığında
window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
});

displayMusic = (music) => {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}
// sayfa açıldığında

// play button Start
play.addEventListener('click', () => {

    const isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? musicPause() : musicPlay();

});

const musicPlay = () => {
    container.classList.add('playing');
    play.classList = 'fa-solid fa-pause';
    audio.play();
};
const musicPause = () => {
    container.classList.remove('playing');
    play.classList = 'fa-solid fa-play';
    audio.pause();
};
// play button End

// prev button Start
prev.addEventListener('click', () => { musicPrev(); });

const musicPrev = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    let playPause = container.classList.contains('playing');
    playPause ? musicPlay() : musicPause();
};
// prev button End

// Next button Start
next.addEventListener('click', () => { musicNext(); });

const musicNext = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    let playPause = container.classList.contains('playing');
    playPause ? musicPlay() : musicPause();
};
// Next button End

const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${güncellenenSaniye}`;
    return sonuc;
};

audio.addEventListener('loadedmetadata', () => {
    duration.textContent = calculateTime(audio.duration);
    // limit
    progressBar.max = Math.floor(audio.duration);
});

// saniye geçtiği sürece burası çalıştıralacak
audio.addEventListener('timeupdate', () => {
    // console.log('deneme');
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener('input', () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

// value input
volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        volumeMuted();
    } else {
        volumeControls.classList.remove('volumeControl');
        volumeBar.value = value;
        volume.classList = "fa-solid fa-volume-high";
        audio.muted = false;
    }
});

// volume => mute , up
volume.addEventListener('click', () => {
    const isVolume = volumeControls.classList.contains('volumeControl');
    isVolume ? volumeUp() : volumeMuted();
});

const volumeMuted = () => {
    volumeControls.classList.add('volumeControl');
    volumeBar.value = 0;
    volume.classList = "fa-solid fa-volume-xmark";
    audio.muted = true;
};

const volumeUp = () => {
    volumeControls.classList.remove('volumeControl');
    volumeBar.value = 50;
    audio.volume = 50 / 100;
    volume.classList = "fa-solid fa-volume-high";
    audio.muted = false;
};
// volume => mute , up