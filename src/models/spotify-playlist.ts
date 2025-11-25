interface SpotifyImage {
  url: string
}

export interface SpotifyPlaylist {
  id: string
  name: string
  uri: string
  description: string
  collaborative: boolean
  public: boolean
  images: SpotifyImage[]
}
