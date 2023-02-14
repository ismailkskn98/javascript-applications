const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const audio = document.querySelector('#audio');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');

const player = new MusicPlayer(musicList);
console.log(player);

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
}
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
}