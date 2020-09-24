import type { ActionTree, ActionContext, CommitOptions } from 'vuex'
import type { State } from './state'
import type { VideoInfo } from '@/api/type'
import { MUTATIONS_KEYS, Mutations } from './mutations'
import * as api from '@/api'


export enum ACTIONS_KEYS {
  GET_VIDEOS = 'GET_VIDEOS',
  GET_VIDEO_BY_ID = 'GET_VIDEO_BY_ID'
}

type ActionContextAugmented = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;

} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
  [ACTIONS_KEYS.GET_VIDEOS](ctx: ActionContextAugmented, pageToken?: string): Promise<VideoInfo | null>;
  [ACTIONS_KEYS.GET_VIDEO_BY_ID](ctx: ActionContextAugmented, id: string): Promise<VideoInfo['data'][0]>;
}


export const actions: ActionTree<State, State> & Actions = {
  async [ACTIONS_KEYS.GET_VIDEOS] ({ commit, state }, pageToken?) {
    if (state.videos.length >= 200) {
      return null
    }

    const res = await api
      .getVideos(pageToken)
      .catch((error) => { throw new Error(error) })

    commit(MUTATIONS_KEYS.SET_VIDEO, res)

    return res

  },

  async [ACTIONS_KEYS.GET_VIDEO_BY_ID] ({ commit, state }, id) {
    let video: VideoInfo['data'][0] | undefined

    if (!(video = state.videos.find(video => video.id === id))) {
      video = await api.getVideoById(id)
    }

    commit(MUTATIONS_KEYS.SET_VIDEO_CURRENT, video)
    return video
  }
}

