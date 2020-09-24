import { MutationTree } from 'vuex'
import { State } from './state'

import type { VideoInfo } from '@/api/type'

export enum MUTATIONS_KEYS {
  SET_VIDEO = 'SET_VIDEO',
  SET_FAVORITE = 'SET_FAVORITE',
  SET_VIDEO_CURRENT = 'SET_VIDEO_CURRENT'
}

export type Mutations<S = State> = {
  [MUTATIONS_KEYS.SET_VIDEO]: (state: S, payload: VideoInfo) => void;
  [MUTATIONS_KEYS.SET_FAVORITE]: (state: S, payload: VideoInfo['data'][0]) => void;
  [MUTATIONS_KEYS.SET_VIDEO_CURRENT]: (state: S, payload: VideoInfo['data'][0]) => void;
}

export const mutations: MutationTree<State> & Mutations = {
  [MUTATIONS_KEYS.SET_VIDEO] (state, payload) {
    state.videos = [...state.videos,...payload.data]
    state.metadata = payload.metadata
  },
  [MUTATIONS_KEYS.SET_FAVORITE] (state, payload) {
    const index = state.favorite.findIndex(({ id }) => id === payload.id)

    index > -1
      ? state.favorite.splice(index, 1)
      : state.favorite.unshift(payload)

    localStorage.setItem('favorite', JSON.stringify(state.favorite))
  },

  [MUTATIONS_KEYS.SET_VIDEO_CURRENT] (state, payload) {
    state.currentVideo = payload
  }
}
