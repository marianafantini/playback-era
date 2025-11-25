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
    possibleColors: string[]
    player: any
    playerReady: boolean
    accessToken?: string
    loading: boolean
  } => ({
    usersPlaylists: [],
    playlist: [],
    playlistSongsLeft: [],
    playedSongs: [],
    possibleColors: [
      'teal',
      'lavanda',
      'lightblue',
      'mint',
      'lightpink',
      'yellow',
      'peach',
      'sage',
      'violet',
    ],
    player: {},
    playerReady: false,
    loading: false,
  }),
  actions: {
    async makeRequestToSpotify(url: string, method: string) {
      this.loading = true
      const accessToken = window.localStorage.getItem('spotify_access_token')
      return await fetch(url, {
        method: method,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
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

    async getUserPlaylists(): Promise<Playlist[]> {
      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/me/playlists',
        'GET',
      )
      const playlistList = response.items.map((playlist: SpotifyPlaylist) => {
        return {
          name: playlist.name,
          id: playlist.id,
          spotifyURI: playlist.uri,
          collaborative: playlist.collaborative,
          description: playlist.description,
          public: playlist.public,
          cover: playlist.images[0]?.url,
        }
      })

      this.usersPlaylists = playlistList
      return playlistList
    },

    async initPlaylist(playlistID: string): Promise<Song[]> {
      this.playedSongs = []

      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks',
        'GET',
      )

      const playlist = response.items
        .filter((item: SpotifyItem) => item.track.type === 'track')
        .map((item: SpotifyItem) => {
          return {
            name: item.track.name,
            spotifyURI: item.track.uri,
            artist: item.track.artists.map((artist) => artist.name).join(' & '),
            year: item.track.album.release_date.split('-')[0],
            image: item.track?.album?.images[0]?.url,
          }
        })

      this.playlist = [...playlist]
      this.playlistSongsLeft = [...playlist]

      return playlist
    },

    async searchForPlaylist(q: string): Promise<Playlist[]> {
      const response = await this.makeRequestToSpotify(
        'https://api.spotify.com/v1/search?type=playlist&q=' + q,
        'GET',
      )
      return response.playlists.items
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
          }
        })
    },

    cleanSearchResults(): void {
      this.searchResults = []
    },

    getNextSong(): void {
      if (this.playlistSongsLeft.length > 0) {
        const index: number = Math.floor(Math.random() * this.playlistSongsLeft.length)
        if (this.playlistSongsLeft[index]) {
          this.currentSong = this.playlist[index]
          if (this.currentSong) {
            this.currentSong.color = this.randomColor()
          }
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
      const index = Math.floor(Math.random() * this.possibleColors.length)
      return this.possibleColors[index] ? this.possibleColors[index] : ''
    },
  },
})
