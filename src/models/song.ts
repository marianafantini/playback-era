export interface Song {
  name: string;
  artist: string;
  year: string;
  color?: string;
  youtubeVideoID?: string;
  spotifyURI?: string;
  duration_ms: number;
}
