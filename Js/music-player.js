function loadingFiles(songs) {
    const musicPLayerContainer = document.getElementById('MusicPlayerContainer')
    const playList = document.getElementById('playlist')

    // Music player Button
    document.getElementById('MusicPlayerButton').addEventListener('click', () => {
        if (musicPLayerContainer.className === 'music-player-container') {
            musicPLayerContainer.className = 'music-player-container music-player-container-hidden'
            playList.className = 'playlist playlist-hidden'
        }
        else {
            musicPLayerContainer.className = 'music-player-container'
            document.getElementById('MusicPlayerButton').className = 'float-music-player-button float-music-player-button-hidden rounded-circle d-flex justify-content-center align-items-center'
        }
    })
    // Hide Button
    document.getElementById('closeButton').addEventListener('click', () => {
        musicPLayerContainer.className = 'music-player-container music-player-container-hidden'
        playList.className = 'playlist playlist-hidden'
        document.getElementById('MusicPlayerButton').className = 'float-music-player-button rounded-circle d-flex justify-content-center align-items-center'
    })

    //PLaylistButton
    document.getElementById('playlistButton').addEventListener('click', () => {
        if (playList.className == 'playlist') playList.className = 'playlist playlist-hidden'
        else playList.className = 'playlist'
    })

    //Audio Controls
    const audio = document.querySelector('audio')
    const playPause = document.getElementById('PlayPause'),
        fowardStep = document.getElementById('FowardStep'),
        backwardStep = document.getElementById('BackwardStep'),
        randomRepeat = document.getElementById('RandomRepeat'),
        songTitle = document.getElementById('songTitle'),
        songArtist = document.getElementById('songArtist'),
        imgMusic = document.getElementById("img_music")

    let ready = songs.length != 0;
    if (ready) {
        playPause.addEventListener('click', () => {
            if (audio.paused) {
                playPause.className = 'fa fa-pause icon px-1'
                audio.play()
            } else {
                playPause.className = 'fa fa-play icon'
                audio.pause()
            }


        })

        $(`i.far`).click(function (e) {
            setIconPlayPause(this);
            let parent = $(this).closest('section').attr("id");
            console.log(parent);
            let song = {
              id: parent,
              title: $(`#${parent} .title`).text(),
              artist: $(`#${parent} .song-artist-name`).text(),
              img: $(`#${parent} img`).attr("src"),
              song: $(`#${parent} input`).val(),
            }
    
            if (audio.paused) {
              audio.play();
            }else{
              audio.pause();
            }
    
          });
        
        //Random, repeat or repeat once 
        randomRepeat.addEventListener('click', () => {
            let text = randomRepeat.innerHTML

            switch (text) {
                case 'repeat':
                    randomRepeat.innerHTML = 'repeat_one'
                    break;
                case 'repeat_one':
                    randomRepeat.innerHTML = 'shuffle'
                    shufflePlaylist()

                    break;
                default:
                    randomRepeat.innerHTML = 'repeat'
                    break;
            }
        })

        // To shuffle the playlist
        const shufflePlaylist = () => {
            songs.sort(() => Math.random() - 0.5)

            for (let i = 0; i < songs.length; i++) {
                if (songs[i].id == selectCurrentSongID()) {
                    let temp = songs.filter(item => item.id == selectCurrentSongID())[0]
                    songs[i] = songs[0]
                    songs[0] = temp
                    break
                }
            }

            refreshPlaylist(songs[0].id)
        }

        // To select current song id
        const selectCurrentSongID = () => {
            let id;

            playlistContainer.childNodes.forEach(item => {
                if (item.className !== undefined && item.className.indexOf('active') !== -1) {
                    id = item.id
                }
            })

            return id
        }

        // Next song
        fowardStep.addEventListener('click', () => {
            for (let i = 0; i < songs.length; i++) {
                if (songs[i].id == selectCurrentSongID()) {
                    if (i + 1 === songs.length) i = 0
                    else i += 1

                    audio.src = songs[i].song
                    songTitle.innerHTML = songs[i].title
                    songArtist.innerHTML = songs[i].artist
                    imgMusic.src = songs[i].img;
                    refreshPlaylist(songs[i].id)
                    break
                }
            }


            playPause.className = 'fa fa-pause icon px-1'
            audio.play()
        })
        //--------------------------------------------

        // Previous song
        backwardStep.addEventListener('click', () => {
            for (let i = 0; i < songs.length; i++) {
                if (songs[i].id == selectCurrentSongID()) {
                    if (i - 1 < 0) i = songs.length - 1
                    else i -= 1

                    audio.src = songs[i].song
                    songTitle.innerHTML = songs[i].title
                    songArtist.innerHTML = songs[i].artist
                    imgMusic.src = songs[i].img;
                    refreshPlaylist(songs[i].id)
                    break
                }
            }


            playPause.className = 'fa fa-pause icon px-1'
            audio.play()
        })
        // ---------------------------------------------

        // Playlist
        /*   const songs = [
              { id: 1, title: 'Amor Foda', artist: 'Bad Bunny', song: '../assets/Music/Bad Bunny - Amor Foda .mp3' },
              { id: 2, title: 'Titi me pregunto', artist: 'Bad Bunny', song: '../assets/Music/Bad Bunny - Tití Me Preguntó _ @moreradj (_5354673502).mp3' },
              { id: 3, title: 'Moscow', artist: 'Bad Bunny', song: '../assets/Music/Bad Bunny - Moscow Mule _ @moreradj (_5354673502) (1).mp3' },
              { id: 4, title: 'Me fui de vacaciones ', artist: 'Bad Bunny', song: '../assets/Music/Bad Bunny - Me Fui De Vacaciones _ @moreradj (_5354673502).mp3' },
              { id: 5, title: 'Te mudaste', artist: 'Bad Bunny', song: '../assets/Music/BAD BUNNY - TE MUDASTE  EL ÚLTIMO TOUR DEL MUNDO [Visualizer].mp3' },
          ] */

        const playlistContainer = document.getElementById('playlist-container')

        //When the song ends this event will be fired
        audio.addEventListener('ended', () => {
            if (randomRepeat.innerHTML === 'repeat_one') {
                audio.play()
                return
            }

            for (let i = 0; i < songs.length; i++) {
                if (songs[i].id == selectCurrentSongID()) {
                    if (i + 1 === songs.length && randomRepeat.innerHTML === 'repeat') i = 0
                    else if (i + 1 === songs.length && randomRepeat.innerHTML !== 'repeat') {
                        playPause.className = 'fa fa-play icon px-1'
                        return
                    }
                    else i += 1

                    audio.src = songs[i].song
                    songTitle.innerHTML = songs[i].title
                    songArtist.innerHTML = songs[i].artist
                    imgMusic.src = songs[i].img
                    refreshPlaylist(songs[i].id)
                    break
                }
            }
            audio.play()
        })

        // Update playlist with an id to put the active class on the current song
        const refreshPlaylist = (currentSongId) => {
            playlistContainer.innerHTML = ''

            songs.forEach(item => {
                playlistContainer.innerHTML += ` 
            <div 
                id="${item.id}" 
                class="title_song overflow-hidden py-1 px-2 ${item.id === currentSongId ? 'active' : ''}">
              ${item.title}<br>
              <span>${item.artist}</span>
            </div>
          `
            })
        }

        refreshPlaylist(1)
    }

}