import { defineStore } from 'pinia'
import { type Song } from '../models/song'

export const usePlaylistStore = defineStore('playlist', {
  state: (): {
    currentSong: Song | null,
    playlist: Song[],
    playedSongs: Song[],
    possibleColors: string[],
    player: any,
    ready: boolean,
  } => ({
    currentSong: null,
    playlist: [],
    playedSongs: [],
    possibleColors: ['teal', 'lavanda', 'lightblue', 'mint', 'lightpink', 'yellow', 'peach', 'sage', 'violet'],
    player: {},
    ready: false,
  }),
  actions: {
    initPlaylist(): void {
      this.playlist = [
        {
          year: 2020,
          name: 'august',
          artist: 'Taylor Swift',
          youtubeVideoID: 'nn_0zPAfyo8'
        },
        {
          year: 2022,
          name: 'As It Was',
          artist: 'Harry Styles',
          youtubeVideoID: 'H5v3kku4y6Q'
        },
        {
          year: 2020,
          name: 'Watermelon Sugar',
          artist: 'Harry Styles',
          youtubeVideoID: 'E07s5ZYygMg'
        },
        {
          year: 1985,
          name: 'Tédio',
          artist: 'Biquíni Cavadão',
          youtubeVideoID: '18nFH23iXJw'
        }
      ]
    },
    getNextSong(): void {
      if (this.playlist.length > 0) {
        const index: number = Math.floor(Math.random() * this.playlist.length)
        if (this.playlist[index]) {
          this.currentSong = this.playlist[index]
          this.currentSong.color = this.randomColor()
          this.playlist.splice(index, 1)
        }
      }
    },

    addPlayedSong(currentSong: Song, index: number): boolean {
      console.log('addPlayedSong', currentSong)
      this.playedSongs.splice(index, 0, currentSong)
      return this.isAddedSongRight(index)
    },

    checkPlayedSongOrder(): boolean {
      let sorted: boolean = true
      const playedSongs = [...this.playedSongs]
      for (let i: number = 0; i < playedSongs.length - 1; i++) {
        const song1: Song | undefined = playedSongs[i]
        const song2: Song | undefined = playedSongs[i + 1]
        if (song1 && song2 && song1.year > song2.year) {
          sorted = false
          break
        }
      }
      return sorted
    },

    isAddedSongRight(index: number): boolean {
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

    randomColor(): string {
      const index = Math.floor(Math.random() * this.possibleColors.length)
      return this.possibleColors[index] ? this.possibleColors[index] : ''
    },
  }
})
