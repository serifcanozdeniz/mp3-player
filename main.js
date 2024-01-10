const prevButton = document.getElementById("prev")

const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//index şarkı içiin
let index

//döngü
let loop = true

//karistirici acik mi?
let isShuffleActive = false

//şarkı listesi
const songList = [
    {
        name: "Yaman Sevda",
        link: "music/Yaman Sevda.mp3",
        artist: "Çelik",
        image: "images/çelik.jpeg"
    },
    {
        name: "Yara",
        link: "music/yara.mp3",
        artist: "Grup Seksendört",
        image: "images/grupseksendört.jpeg"
    },
    {
        name: "Çok Yalnızım",
        link: "music/çok yalnızım.mp3",
        artist: "İlyas Yalçıntaş",
        image: "images/ilyasyalçıntaş.jpeg"
    },
    {
        name: "Olsaydım",
        link: "music/olsaydım.mp3",
        artist: "Kayahan",
        image: "images/kayahan.jpeg"
    },
    {
        name: "Antidepresan",
        link: "music/antidepresan.mp3",
        artist: "Mabel Matiz",
        image: "images/mabelmatiz.jpeg"
    },
    {
        name: "Ateşe Düştüm",
        link: "music/ateşe düştüm.mp3",
        artist: "Mert Demir",
        image: "images/mertdemir.jpeg"
    },
    {
        name: "Unutamadım",
        link: "music/unutamadım.mp3",
        artist: "Müslüm Gürses",
        image: "images/müslümgürses.jpeg"
    },
    {
        name: "Böyle Ayrılık Olmaz",
        link: "music/böyle ayrılık olmaz.mp3",
        artist: "Nilüfer",
        image: "images/nilüfer.jpeg"
    },
    {
        name: "Beni Unutma",
        link: "music/beni unutma.mp3",
        artist: "Sezen Aksu",
        image: "images/sezenaksu.jpeg"
    },
    {
        name: "Ay Tenli Kadın",
        link: "music/ay tenli kadın.mp3",
        artist: "Ufuk Beydemir",
        image: "images/ufukbeydemir.jpeg"
    },
    {
        name: "Şansım Olsun",
        link: "music/derya-ulug-sansim-olsun.mp3",
        artist: "Derya Uluğ",
        image: "images/deryaulug.jpeg"
    }
]

//zaman formatı ayarlama
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60)
    minute = minute < 11 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60)
    second = second < 11 ? "0" + second : second
    return `${minute}: ${second}`
}



//şarkıyı çalma
const playAudio = () => {

    console.log("playAudio")
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")

}


/*

{
        name: "Yaman Sevda",
        link: "music/Yaman Sevda.mp3",
        artist: "Çelik",
        image: "images/çelik.jpeg"
    },
*/
//şarkı atama

const setSong = (arrayIndex) => {
    if (loop == true && isShuffleActive == true) {
        arrayIndex = Math.floor(Math.random() * 100) % 10
    }
    console.log(arrayIndex + isShuffleActive)

    let { name, link, artist, image } = songList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    audio.onloadedmetadata = () => {

        maxDuration.innerText = timeFormatter(audio.duration)
    }
    playListContainer.classList.add("hide")

    playAudio()
}

//sıradakini çal
const nextSong = () => {
    if (loop) {

        if (index == (songList.length - 1)) {
            index = 0
        } else {
            index += 1
        }
        setSong(index)
    } else {
        let randIndex = Math.floor(Math.random() * songList.length)
        setSong(randIndex)
    }
}

playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
    //
}, 1000);

progressBar.addEventListener('click', (event) => {
    let coordStart = progressBar.getBoundingClientRect().left

    let coordEnd = event.clientX
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progressBar * 100 + "%"

    audio.currentTime = progress * audio.duration
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

const previousSong = () => {
    if (index > 0) {
        index -= 1
    } else {
        index = songList.length - 1
    }
    setSong(index)
    playAudio()
}

repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false
        console.log('tekrar kapatıldı')
    } else {
        repeatButton.classList.add('active')
        audio.loop = true
        console.log('tekrar açıldı')
    }
}
)

shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        isShuffleActive = false
        shuffleButton.classList.remove('active')
        audio.loop = true
        console.log('karıştırıcı kapatıldı')
    } else {
        isShuffleActive = true
        shuffleButton.classList.add('active')
        audio.loop = false
        console.log('karıştırıcı açıldı')
    }
})

const initializePlayList = () => {
    for (let i in songList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songList[i].image}"
        </div>
        <div class="playlist-song-details">
        <span id="playlist-song-name">
        ${songList[i].name}
        </span>
        <span id="playlist-song-artist-album">
        ${songList[i].artist}
        </span>
        </div>
        </li>`
    }
}



//tıklama yakalama
nextButton.addEventListener('click', nextSong)
pauseButton.addEventListener('click', pauseAudio)
playButton.addEventListener('click', playAudio)
prevButton.addEventListener('click', previousSong)

//şarkı bitişini yakala
audio.onended = () => {
    nextSong()
}

audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//ekran yüklenildiğinde
window.onload = () => {
    index = 0
    setSong(index)
    //durdur ve şarkı listesi oluştur

    pauseAudio()
    initializePlayList()
}