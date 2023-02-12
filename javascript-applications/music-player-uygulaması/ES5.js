function Music(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
}

Music.prototype.getName = function () {
    return this.title + " - " + this.singer;
}

const musicList = [
    new Music('Bosver', 'Nilüfer', '1.jpeg', '1.mp3'),
    new Music('Bu da geçer', 'Yalın', '2.jpeg', '2.mp3'),
    new Music('Kimi', 'Duman', '3.jpeg', '3.mp3'),
    new Music('Tut', 'Zeynep Bastık', '4.jpeg', '4.mp3'),
]

console.log(musicList);
// 0: Music {title: 'Bosver', singer: 'Nilüfer', img: '1.jpeg', file: '1.mp3'}
// 1: Music {title: 'Bu da geçer', singer: 'Yalın', img: '2.jpeg', file: '2.mp3'}
// 2: Music {title: 'Kimi', singer: 'Duman', img: '3.jpeg', file: '3.mp3'}
// 3: Music {title: 'Tut', singer: 'Zeynep Bastık', img: '4.jpeg', file: '4.mp3'}
