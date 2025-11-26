import { defineStore } from 'pinia'
import { type Song } from '@/models/song'
import type { SpotifyItem } from '@/models/spotify-track.ts'
import type { Playlist } from '@/models/playlist.ts'
import type { SpotifyPlaylist } from '@/models/spotify-playlist.ts'

export const usePlaylistStore = defineStore('playlist', {
  state: (): {
    currentSong?: Song
    searchResults?: Playlist[]
    usersPlaylists: Playlist[]
    playlist: Song[]
    playlistSongsLeft: Song[]
    playedSongs: Song[]
    player: any
    playerReady: boolean
    loading: boolean
    amountOfRounds: number
    playing: boolean
  } => ({
    usersPlaylists: [],
    searchResults: [],
    playlist: [],
    playlistSongsLeft: [],
    playedSongs: [],
    player: {},
    playerReady: false,
    loading: false,
    amountOfRounds: 3,
    playing: false
  }),
  actions: {

    setPlaying(bool: boolean) {
      this.playing = bool
    },

    async makeRequestToSpotify(url: string, method: string) {
      this.loading = true
      const accessToken = window.localStorage.getItem('spotify_access_token')
      return await fetch(url, {
        method: method,
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      })
        .then((response) => {
          if (response.status === 401) {
            window.location.href = '/'
          }
          return response.json()
        })
        .finally(() => {
          this.loading = false
        })
    },

    spotifyPlaylistToAppPlaylist(items: SpotifyPlaylist[]): Playlist[] {
      return items
        .filter((item: SpotifyPlaylist | null) => item !== null)
        .map((playlist: SpotifyPlaylist) => {
          return {
            name: playlist.name,
            id: playlist.id,
            spotifyURI: playlist.uri,
            collaborative: playlist.collaborative,
            description: playlist.description,
            public: playlist.public,
            cover: playlist.images[0]?.url,
            amountOfTracks: playlist.tracks.total
          }
        })
    },

    async setUserPlaylists(): Promise<void> {
      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/me/playlists',
        'GET'
      )
      const playlistList = this.spotifyPlaylistToAppPlaylist(response.items)
      this.usersPlaylists = [...playlistList]
    },

    spotifyTracksToAppSongs(items: SpotifyItem[]): Song[] {
      return items
        .filter((item: SpotifyItem) => item.track.type === 'track')
        .filter((item: SpotifyItem) => !!item.track.album.release_date)
        .map((item: SpotifyItem) => {
          return {
            name: item.track.name,
            spotifyURI: item.track.uri,
            artist: item.track.artists.map((artist) => artist.name).join(' & '),
            year: item.track.album.release_date.split('-')[0] || '',
            image: item.track?.album?.images[0]?.url
          }
        })
        .filter((item) => item.year !== '')
    },

    getSongsForRounds(playlist: Song[]): Song[] {
      const numberOfSongs: number = Math.min(this.amountOfRounds + 1, playlist.length)
      const songs: Song[] = []

      while (songs.length < numberOfSongs) {
        let index: number = Math.floor(Math.random() * playlist.length)
        if (songs.indexOf(playlist[index] as Song) === -1) {
          songs.push(playlist[index] as Song)
        }
      }
      return songs
    },

    async initPlaylist(playlistID: string) {
      this.playedSongs = []

      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
        'GET'
      )

      const playlist: Song[] = this.spotifyTracksToAppSongs(response.items)
      const playlistForRounds: Song[] = [...this.getSongsForRounds(playlist)]
      this.playlist = [...playlistForRounds]
      this.playlistSongsLeft = [...playlistForRounds]

      return playlist
    },

    async searchForPlaylist(q: string): Promise<Playlist[]> {
      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/search?type=playlist&q=' + q,
        'GET'
      )
      return this.spotifyPlaylistToAppPlaylist(response.playlists.items)
    },

    cleanSearchResults(): void {
      this.searchResults = []
    },

    getNextSong(): void {
      if (this.playlistSongsLeft && this.playlistSongsLeft.length > 0) {
        const index: number = Math.floor(Math.random() * this.playlistSongsLeft.length)
        if (this.playlistSongsLeft[index]) {
          this.currentSong = this.playlistSongsLeft[index]
          if (this.currentSong) {
            this.currentSong.color = this.randomColor()
          }
          console.log('will splice here ', index)
          this.playlistSongsLeft.splice(index, 1)
        }
      }
    },

    isGameStillActive(): boolean {
      return this.playlistSongsLeft.length > 0
    },

    addPlayedSong(currentSong: Song, index: number): boolean {
      console.log('addPlayedSong', currentSong)
      this.playedSongs.splice(index, 0, currentSong)
      const isOrderCorrect: boolean = this.checkPlayedSongOrder()
      if (!isOrderCorrect) {
        setTimeout(() => {
          console.log('splice remove item')
          this.playedSongs.splice(index, 1)
        }, 1100)
      }

      return isOrderCorrect
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

    randomColor(): string {
      const possibleColors = [
        'teal',
        'lavanda',
        'lightblue',
        'mint',
        'lightpink',
        'yellow',
        'peach',
        'sage',
        'violet'
      ]
      const index = Math.floor(Math.random() * possibleColors.length)
      return possibleColors[index] ? possibleColors[index] : ''
    }
  }
})
