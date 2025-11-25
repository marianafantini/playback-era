interface SpotifyArtist {
  name: string
}

interface AlbumImages {
  url: string
}

interface SpotifyAlbum {
  release_date: string
  images: AlbumImages[]
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
