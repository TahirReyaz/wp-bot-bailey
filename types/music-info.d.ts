declare module "music-info" {
  export function searchSong(songParams, meh: Number): Promise<any>;
  export function searchLyrics(songParams, meh: Number): Promise<any>;
}
