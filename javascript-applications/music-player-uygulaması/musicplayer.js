// class MusicPlayer Start
class MusicPlayer {

    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0;
    };

    // musicList music get
    getMusic() {
        return this.musicList[this.index];
    };


    // next song
    next() {
        if ((this.index + 1) != this.musicList.length) {
            this.index++;
        } else {
            this.index = 0;
        }
    };

    // previous song
    prev() {
        if (this.index != 0) {
            this.index--;
        } else {
            this.index = this.musicList.length - 1;
        }
    };
}
// class MusicPlayer End