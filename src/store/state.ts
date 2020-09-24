import type { VideoInfo } from '@/api/type'

const favorite = JSON.parse(
  localStorage.getItem('favorite') || '[]'
) as VideoInfo['data']

export interface State {
  videos: VideoInfo['data'];
  currentVideo: null | VideoInfo['data'][0];
  metadata: null | VideoInfo['metadata'];
  favorite: VideoInfo['data'];
}
export const state: State = {
  videos: [],
  currentVideo: null,
  metadata: null,
  favorite
}
