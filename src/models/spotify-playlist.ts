interface SpotifyImage {
  url: string
}

interface SpotifyTracks {
  total: number
}

export interface SpotifyPlaylist {
  id: string
  name: string
  uri: string
  description: string
  collaborative: boolean
  public: boolean
  images: SpotifyImage[]
  tracks: SpotifyTracks
}
