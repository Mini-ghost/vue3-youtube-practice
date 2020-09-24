import { Store } from '@/store'
import { State } from '@/store/state'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

// Vuex@4.0.0-beta.1 is missing the typing for `useStore`. See https://github.com/vuejs/vuex/issues/1736
declare module 'vuex' {
  import { Store } from '@/store'
  export function useStore(key?: string): Store
}