import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    currentSong: {},
    playlist: [],
    playedSongs: [],
    possibleColors: ['teal', 'lavanda', 'lightblue', 'mint', 'lightpink', 'yellow', 'peach', 'sage', 'violet']
  }),
  actions: {
    initPlaylist() {
      this.playlist = [
        {
          year: 2020,
          name: 'august',
          artist: 'Taylor Swift'
        },
        {
          year: 2022,
          name: 'As It Was',
          artist: 'Harry Styles'
        },
        {
          year: 2020,
          name: 'Watermelon Sugar',
          artist: 'Harry Styles'
        },
        {
          year: 1985,
          name: 'Tédio',
          artist: 'Biquíni Cavadão'
        }
      ]
    },
    getNextSong() {
      if (this.playlist.length > 0) {
        const index: number = Math.floor(Math.random() * this.playlist.length)
        this.currentSong = this.playlist[index]
        this.currentSong.color = this.randomColor()
        this.playlist.splice(index, 1)
      }
    },

    addPlayedSong(currentSong, index) {
      console.log('addPlayedSong', currentSong)
      this.playedSongs.splice(index, 0, currentSong)
      return this.isAddedSongRight(index)
    },

    getReference(currentSong) {
      return currentSong.name.concat(currentSong.artist).replace(' ', '-')
    },

    checkPlayedSongOrder() {
      let sorted: boolean = true
      for (let i: number = 0; i < this.playedSongs.length - 1; i++) {
        if (this.playedSongs[i].year > this.playedSongs[i + 1].year) {
          sorted = false
          break
        }
      }
      return sorted
    },

    isAddedSongRight(index) {
      const sorted: boolean = this.checkPlayedSongOrder()

      if (sorted) {
        console.log('segue o jogo')
      } else {
        console.log('error')
        setTimeout(() => {
          this.playedSongs.splice(index, 1)
        }, 4000)
      }

      return sorted
    },

    randomColor() {
      const index = Math.floor(Math.random() * this.possibleColors.length)
      return this.possibleColors[index]
    },

    playSong() {
      // const iframe = document.createElement('iframe')
      // iframe.setAttribute('src', 'https://www.youtube.com/embed/watch?v=18nFH23iXJw')
      // iframe.setAttribute('display', 'flex')
      // document.body.appendChild(iframe)
    }
  }
})
