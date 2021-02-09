<template>
  <div class="hover-effect relative px-3 pt-3 pb-8">
    <div class="relative rounded-lg overflow-hidden">
      <router-link :to="to">
        <video-thumbnal
          class="pb-16:9 bg-center bg-cover"
          :url="video.thumbnail.high.url"
        />
      </router-link>
      <video-favorite
        class="absolute bottom-1 right-1 rounded-full"
        :video="video"
      />
    </div>
    <div class="mt-2">
      <h2 class="table font-bold line-clamp-2 hover:text-green-600">
        <router-link :to="to">
          {{ video.title }}
        </router-link>
      </h2>
      <small class="text-gray-600 select-none">
        {{ video.channelTitle }}
      </small>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

import type { VideoInfo } from '@/api/type'
import VideoThumbnal from './VideoThumbnal.vue'
import VideoFavorite from './VideoFavorite.vue'

export default defineComponent({
  name: 'VideoItem',
  components: {
    VideoFavorite,
    VideoThumbnal
  },
  props: {
    video: {
      type: Object as PropType<VideoInfo['data'][0]>,
      required: true
    }
  },
  setup (props) {
    const id = computed(() => props.video.id)
    const to = computed(() => `/video/${id.value}`)

    return {
      to
    }
  }
})
</script>

<style lang="scss" scoped>
.hover-effect::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(#e0e0e0, .75);
  border-radius: 0.75rem;
  transform: scale(0.8);
  transition:
    opacity .3s,
    transform .3s;
  opacity: 0;
  z-index: -1;
}

.hover-effect:hover::before {
  opacity: 1;
  transform: scale(1)
}
</style>

