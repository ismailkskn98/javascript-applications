const container = document.querySelector('.container');

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

const progressBar = document.querySelector('#progress-bar');

const player = new MusicPlayer(musicList);
console.log(player);

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

function musicPlay() {
    container.classList.add('playing');
    play.classList = 'fa-solid fa-pause';
    audio.play();
};
function musicPause() {
    container.classList.remove('playing');
    play.classList = 'fa-solid fa-play';
    audio.pause();
};
// play button End

// prev button Start
prev.addEventListener('click', () => {
    musicPrev();
});

function musicPrev() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    let playPause = container.classList.contains('playing');
    playPause ? musicPlay() : musicPause();
};
// prev button End

// Next button Start
next.addEventListener('click', () => {
    musicNext();
});

function musicNext() {
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