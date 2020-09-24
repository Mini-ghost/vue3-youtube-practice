<template>
  <div
    v-for="video in videos"
    :key="video.id"
    class="xl:w-1/4 lg:w-1/3 sm:w-1/2 w-full"
  >
    <video-item :video="video" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { VideoInfo } from '@/api/type'
import VideoItem from '@/components/VideoItem.vue'

export default defineComponent({
  name: 'VideoList',
  components: {
    VideoItem
  },
  props: {
    videos: {
      type: Array as PropType<VideoInfo['data']>,
      required: true
    }
  }
})
</script>
