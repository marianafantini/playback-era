interface SpotifyArtist {
  name: string
}

interface SpotifyAlbum {
  release_date: string
}

interface SpotifyTrack {
  name: string
  uri: string
  artists: SpotifyArtist[]
  album: SpotifyAlbum
  type: string
  duration_ms: number
}

export interface SpotifyItem {
  track: SpotifyTrack
}
