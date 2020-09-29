<template>
  <div ref="root" />
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import youtube from 'youtube-player'

const STATE_MAP = {
  '-1': 'unstarted',
  '0': 'ended',
  '1': 'playing',
  '2': 'paused',
  '3': 'buffering',
  '5': 'cued'
}

export default defineComponent({
  name: 'VideoPlayer',
  props: {
    videoId: {
      type: String,
      required: true
    }
  },
  emits: [...Object.values(STATE_MAP)],
  setup (props, { emit }) {
    let player: ReturnType<typeof youtube> | undefined
    const root = ref<HTMLDivElement>()

    const unwatch = watch(computed(() => props.videoId), (videoId) => {
      if (player) {
        // loadVideoById 用於 載入後自動撥放
        player.cueVideoById(videoId)
        return
      }

      onMounted(() => {
        player = youtube(root.value!, { videoId })
        player.on('stateChange', (e) => {
          const state = STATE_MAP[`${e.data}` as keyof typeof STATE_MAP]
          emit(state, e)
        })
      })
    }, {
      immediate: true
    })

    // 移除 watch
    // 銷毀播放器
    onBeforeUnmount(() => {
      unwatch()
      if (
        player &&
        typeof player.destroy === 'function'
      ) {
        player.destroy()
      }
    })

    return {
      root
    }
  }
})
</script>
