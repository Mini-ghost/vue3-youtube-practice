<template>
  <button
    class="flex justify-center items-center w-8 h-8 hover:opacity-100 focus:outline-none duration-300"
    :class=" isFavorite
      ? 'opacity-100 bg-green-700 text-white'
      : 'opacity-50 bg-gray-200 hover:text-white hover:bg-green-400'
    "
    @click.stop="onFavorite"
  >
    <svg
      class="w-3/5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
    </svg>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { useStore } from 'vuex'

import type { VideoInfo } from '@/api/type'
import { MUTATIONS_KEYS } from '@/store/mutations'

export default defineComponent({
  name: 'VideoFavorite',
  props: {
    video: {
      type: Object as PropType<VideoInfo['data'][0]>,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const id = computed(() => props.video ? props.video.id : '')


    const isFavorite = computed(() => {
      const { favorite } = store.state
      return favorite.some(video => video.id === id.value)
    })

    const onFavorite = () => {
      store.commit(MUTATIONS_KEYS.SET_FAVORITE, props.video)
    }

    return {
      id,
      isFavorite,
      onFavorite
    }
  }
})
</script>
