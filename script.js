const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle')
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const colorThief = new ColorThief(); 

const exitMusic = {
    songName: "Exit Music",
    file: "exit_music",
    artist: "Radiohead",
    liked: false,
};

const oQueEOAmor = {
    songName: "O Que É O Amor",
    file: "o_que_e_o_amor",
    artist: "Arlindo Cruz",
    liked: false,
};

const feelGood = {
    songName: "Feel Good",
    file: "feel_good",
    artist: "Gorillaz",
    liked: false,
};

const promise = {
    songName: "Promise",
    file: "promise",
    artist: "Laufey",
    liked: false,
};

const myHumps = {
    songName: "My Humps",
    file: "my_humps",
    artist: "Black Eyed Peas",
    liked: false,
};

const sorriSouRei = {
    songName: "Sorri, Sou Rei",
    file: "sorri_sou_rei",
    artist: "Natiruts",
    liked: false,
};

const thisComesFromInside = {
    songName: "This Comes From Inside",
    file: "this_comes_from_inside",
    artist: "The Living Tombstone",
    liked: false,
};

const wiseMan = {
    songName: "Wiseman",
    file: "wiseman",
    artist: "Frank Ocean",
    liked: false,
};

const todoHomem = {
    songName: "Todo Homem",
    file: "todo_homem",
    artist: "Zeca Veloso, Caetano Veloso, Moreno Veloso e Tom Veloso",
    liked: false,
};

 let isPlaying = false;
 let isShuffled = false;
 let repeatOn = false;
 const originalplaylist = JSON.parse(localStorage.getItem('playlist')) ?? [
    exitMusic,
    oQueEOAmor,
    feelGood,
    promise,
    myHumps,
    sorriSouRei,
    thisComesFromInside,
    wiseMan,
    todoHomem,
 ];
let sortedPlaylist = [...originalplaylist];
let index = 0;

function playSong() {
    play.querySelector("i.bi").classList.remove("bi-play-circle-fill");
    play.querySelector("i.bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector("i.bi").classList.add("bi-play-circle-fill");
    play.querySelector("i.bi").classList.remove("bi-pause-circle-fill");
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
    } else {
    sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalplaylist));
}

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector('.bi').classList.remove('bi-heart');
    likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
    } else {
    likeButton.querySelector('.bi').classList.add('bi-heart');
    likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
    likeButton.classList.remove('button-active');
    }
    }
   

function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `musicas/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

initializeSong();
function previousSong() {
    if(index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -=1;
    }
    initializeSong();
    playSong();
}

    function nextSong() {
        if (index === sortedPlaylist.length - 1) {
            index = 0;
        }
        else {
            index +=1;
        }
        initializeSong();
        playSong();
    }

    function updateProgress() {
        const barWidth = (song.currentTime/song.duration)*100;
        currentProgress.style.setProperty('--progress',`${barWidth}%`);
        songTime.innerText = toHHMMSS(song.currentTime);
    }

    function jumpTo(event) {
        const width = progressContainer.clientWidth;
        const clickPosition = event.offsetX;
        const jumpToTime = (clickPosition/width)* song.duration;
        song.currentTime= jumpToTime;
    }

    function shuffleArray(preShuffleArray) {
        const size = preShuffleArray.length;
        let currentIndex = size -1;
        while (currentIndex > 0){
            let randomIndex = Math.floor(Math.random()* size);
            let aux = preShuffleArray[currentIndex];
            preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
            preShuffleArray[randomIndex] = aux;
            currentIndex -=1;
        }
    }

    function shuffleButtonClicked() {
        if(isShuffled === false) {
            isShuffled = true;
            shuffleArray(sortedPlaylist);
            shuffleButton.classList.add('button-active');
        }
        else {
            isShuffled = false;
            sortedPlaylist = [...originalplaylist];
            shuffleButton.classList.remove('button-active');
        }
    }

    function repeatButtonClicked() {
        if (repeatOn === false) {
            repeatOn = true;
            repeatButton.classList.add('button-active');
        } else {
            repeatOn = false;
            repeatButton.classList.remove('button-active');
        }
    }

    function nextOrRepeat() {
        if (repeatOn === false) {
            nextSong();
        } else {
            playSong();
        }
    }

    function toHHMMSS(originalNumber) {
        let hours = Math.floor(originalNumber/3600);
        let min = Math.floor((originalNumber - (hours * 3600)) /60);
        let secs = Math.floor(originalNumber - (hours * 3600) - (min*60));

        return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2, "0")}`;
    }

    function updateTotalTime() {
        totalTime.innerText = toHHMMSS(song.duration);
    }

    function setBackgroundColor(colorRGB) {
        document.body.style.backgroundImage = `linear-gradient(to bottom, ${colorRGB}, rgb(25, 35, 37))`;
    }

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
cover.addEventListener('load', function() {
    try {
        const dominantColor = colorThief.getColor(cover);
        const rgb = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
        document.body.style.backgroundImage = `linear-gradient(to bottom, ${rgb}, rgb(25, 35, 37))`;
    } catch (error) {
        console.warn("Erro ao extrair cor (provavelmente CORS). Usando padrão.");
        document.body.style.backgroundImage = `linear-gradient(to bottom, rgb(59, 87, 94), rgb(25, 35, 37))`;
    }
});
