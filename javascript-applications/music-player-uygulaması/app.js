const container = document.querySelector('.container');
const image = document.querySelector('#music-image');
const audio = document.querySelector('#audio');
const title = document.querySelector('#music-details .title');
const singer = document.querySelector('#music-details .singer');
const prev = document.querySelector('#controls #prev');
const play = document.querySelector('#controls #play');
const next = document.querySelector('#controls #next');

const player = new MusicPlayer(musicList);
// console.log(player);

player.next();
music = player.getMusic();

window.addEventListener('load', () => {
    let music = player.getMusic();
    console.log(music);
    displayMusic(music);
});

displayMusic = (music) => {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener('click', () => {
    audio.play();
});