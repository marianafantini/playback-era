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
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  uri: string;
  description: string;
  collaborative: boolean;
  public: boolean;
}
