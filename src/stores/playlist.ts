import { defineStore } from 'pinia'
import { type Song } from '@/models/song'
import type { SpotifyItem } from '@/models/spotify-track.ts'

export const usePlaylistStore = defineStore('playlist', {
  state: (): {
    currentSong?: Song,
    playlist: Song[],
    playedSongs: Song[],
    possibleColors: string[],
    player: any,
    playerReady: boolean,
    accessToken?: string,
  } => ({
    playlist: [],
    playedSongs: [],
    possibleColors: ['teal', 'lavanda', 'lightblue', 'mint', 'lightpink', 'yellow', 'peach', 'sage', 'violet'],
    player: {},
    playerReady: false,
  }),
  actions: {
    async initPlaylist(): Promise<Song[]> {
      const accessToken = window.localStorage.getItem('spotify_access_token')
      console.log("accessToken", accessToken)
      const response = await fetch('https://api.spotify.com/v1/playlists/2h9UT9SQZoC58sQ5KvTFdX/tracks', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }).then((response) => {
        return response.json()
      })

      const playlist = response.items.map((item: SpotifyItem) => {
        return {
          name: item.track.name,
          spotifyURI: item.track.uri,
          artist: item.track.artists.map((artist) => artist.name).join(' & '),
          year: item.track.album.release_date.split("-")[0],
        }
      })

      this.playlist = playlist

      return playlist
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
    }
  }
})
