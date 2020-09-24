<template>
  <div class="w-full max-w-screen-xl relative mx-auto px-6">
    <div class="flex items-stretch flex-wrap -m-2">
      <template v-if="favorites.length">
        <video-list :videos="favorites" />
      </template>
      <template v-else>
        <div class="w-full text-lg text-center text-gray-600 font-bold select-none">
          Not Font Any Favorite Video !!!
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import VideoList from '@/components/VideoList.vue'

export default defineComponent({
  name: 'Favorite',
  components: {
    VideoList
  },
  setup () {
    const store = useStore()
    const favorites = computed(() => store.state.favorite)

    return {
      favorites
    }
  }
})
</script>
