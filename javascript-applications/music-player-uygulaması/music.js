// class Music Start
class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    };

    // song name and artist name get
    getName() {
        return this.title + ' - ' + this.singer;
    };
};
// class Music End

// musicList Start
const musicList = [
    new Music('Bosver', 'Nilüfer', '1.jpeg', '1.mp3'),
    new Music('Bu da Geçer mi Sevgilim', 'Yalın', '2.jpeg', '2.mp3'),
    new Music('Aramızda Uçurumlar', 'Suat Suna', '3.jpeg', '3.mp3'),
]
// musicList End