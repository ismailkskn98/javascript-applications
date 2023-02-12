const player = new MusicPlayer(musicList);
// console.log(player);
let music = player.getMusic();
// console.log(music);
console.log(music.getName());
player.next();
music = player.getMusic();

console.log(music.getName());
player.next();
music = player.getMusic();

console.log(music.getName());
player.next();
music = player.getMusic();

console.log(music.getName());
player.previous();
music = player.getMusic();

console.log(music.getName());
player.next();
music = player.getMusic();

console.log(music.getName());
player.previous();
music = player.getMusic();