// element container
const container = document.querySelector('.container');
const controls = document.querySelector('#controls');
const listGroup = document.querySelector('.list-group');
// element container

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
const progressBar = document.querySelector('#progress-bar');
// times

// volume
const volumeContainer = document.querySelector('.volume-container');
const volume = document.querySelector('#volume');
const volumeBar = document.querySelector('#volume-bar');
// volume

// class
const player = new MusicPlayer(musicList);
// class

// when the page is opened
window.addEventListener('load', () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    volumeBar.value = 50;
    audio.volume = 50 / 100;
});

// Show music information by index number
const displayMusic = (music) => {
    title.innerHTML = music.getName();
    singer.innerHTML = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

// music List display (show)
const displayMusicList = (musicList) => {
    for (let i in musicList) {
        let liTag = `
            <li class="list-group-item">
                <span>${musicList[i].getName()}</span>
                <span id = "music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class = "music-${i}" src = "mp3/${musicList[i].file}"></audio>
            </li>
        `;
        listGroup.insertAdjacentHTML('beforeend', liTag);

        let liAudioDuration = listGroup.querySelector(`#music-${i}`);
        let liAudioTag = listGroup.querySelector(`.music-${i}`);

        liAudioTag.addEventListener('loadeddata', () => {
            liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    }
};
// sayfa açıldığında

// play button Start
play.addEventListener('click', () => {

    const isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? musicPause() : musicPlay();

});

// music play
const musicPlay = () => {
    container.classList.add('playing');
    play.querySelector('i').classList = 'fa-solid fa-pause';
    audio.play();
};

// music pause
const musicPause = () => {
    container.classList.remove('playing');
    play.querySelector('i').classList = 'fa-solid fa-play';
    audio.pause();
};
// play button End

// prev button Start
prev.addEventListener('click', () => { musicPrev(); });

// previous song
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

// next song
const musicNext = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    let playPause = container.classList.contains('playing');
    playPause ? musicPlay() : musicPause();
};
// Next button End

// calculate the duration of the music
const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const güncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${güncellenenSaniye}`;
    return sonuc;
};

// show the duration of the music
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

// show current music duration in bar
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
    const isVolume = volumeContainer.classList.contains('volumeControl');
    isVolume ? volumeUp() : volumeMuted();
});

// music Muted
const volumeMuted = () => {
    volumeContainer.classList.add('volumeControl');
    volumeBar.value = 0;
    volume.classList = "fa-solid fa-volume-xmark";
    audio.muted = true;
};

// music Up
const volumeUp = () => {
    volumeContainer.classList.remove('volumeControl');
    volumeBar.value = 50;
    audio.volume = 50 / 100;
    volume.classList = "fa-solid fa-volume-high";
    audio.muted = false;
};
// volume => mute , up

// list musics events
listGroup.addEventListener('click', (e) => {
    let element = e.target;
    let musics = player.musicList;
    if (!(element.classList == 'list-group-item')) return;

    for (let music of musics) {
        if (element.children[0].textContent == music.getName()) {
            displayMusic(music);
            musicPlay();
            player.getMusic();
        }
    };
});