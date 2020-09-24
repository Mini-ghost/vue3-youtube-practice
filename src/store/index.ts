import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex'
import { State, state } from './state'
import { Mutations, mutations } from './mutations'
import { Actions, actions } from './actions'

export default createStore({
  state,
  mutations,
  actions
})

// https://dev.to/3vilarthas/vuex-typescript-m4j
export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions, P extends Parameters<Actions[K]>[1]>(
    key: K,
    payload: P,
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
}
