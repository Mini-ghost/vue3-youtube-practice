<template>
  <div
    v-if="video"
    class="w-full max-w-screen-xl relative mx-auto px-6"
  >
    <div class="relative w-full pb-16:9 rounded-lg overflow-hidden border-green-600 border-2">
      <video-player
        class="absolute w-full h-full top-0 left-0"
        :video-id="id"
      />
    </div>
    <div class="my-4">
      <video-favorite
        class="float-right rounded-full hover:opacity-100 duration-100 outline-none ml-4"
        :video="video"
      />
      <div class="my-6">
        <h1 class="text-xl font-bold">
          <a
            class="hover:text-green-600 duration-300"
            target="_blank"
            rel="noopener"
            :href="`https://www.youtube.com/watch?v=${video.id}`"
          >
            {{ video.title }}
          </a>
        </h1>
        <p class="font-bold text-sm">
          {{ video.channelTitle }}
        </p>
      </div>

      <div class="border-green-600 rounded-lg bg-green-100 bg-opacity-50 border-2 pb-6">
        <div class="inline-block font-bold text-xs text-white px-4 py-2 bg-green-600 rounded-br-lg uppercase select-none">
          description
        </div>
        <div
          class="text-sm p-6 whitespace-pre-wrap break-all"
          v-html="description"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import { ACTIONS_KEYS } from '@/store/actions'

import VideoPlayer from '@/components/VideoPlayer.vue'
import VideoFavorite from '@/components/VideoFavorite.vue'

// TODO: 強化 REGEX_HASHTAG 細節
const REGEX_HASHTAG = /(?<!\S)#(\w|[\u3400-\uFFFD])+/g
const REGEX_LINK = /(http|https):\/\/([\w.]+\/?)\S*/g

function pipe<T> (...fns: ((val: T) => T)[]) {
  return (value: T) => fns.reduce((val, fn) => fn(val), value)
}

/**
 * 解析超連結
 * @param {String} value 待解析字串
 * @returns {String} 解析完畢字串
 */
function parserLink (value: string) {
  const linkCass = 'text-green-600 hover:underline'
  const linkAttrs = 'target="_blank" rel="noopener"'
  return value.replace(REGEX_LINK, str =>
    `<a ${linkAttrs} class="${linkCass}" href="${str}">${str}</a>`
  )
}

/**
 * 解析 hashtag
 * @param {String} value 待解析字串
 * @returns {String} 解析完畢字串
 */
function parserHashtag (value: string) {
  const hashtagClass =
    'inline-block ' +
    'text-green-600 hover:underline ' +
    'mr-1 ' +
    'select-none '
  return value.replace(REGEX_HASHTAG, str => {
    str = str.trim()
    const linkBase = 'https://www.youtube.com/results'
    // encodeURIComponent('#') => '%23'
    const linkHref = `${linkBase}?search_query=${str.replace('#', '%23')}`
    const linkAttrs = 'target="_blank" rel="noopener"'
    return `<a ${linkAttrs} class="${hashtagClass}" href="${linkHref}">${str}</a>`
  })
}

export default defineComponent({
  components: {
    VideoPlayer,
    VideoFavorite
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const id = computed(() => route.params.id)
    const video = computed(() => store.state.currentVideo)

    const description = computed(() => {
      if(!video.value) { return '' }
      return pipe<string>(
        parserLink,
        parserHashtag
      )(video.value.description)
    })

    const unwatch = watch(id, id => {
      if (!id) { return }
      if (Array.isArray(id)) {
        id = id[0]
      }
      store.dispatch(ACTIONS_KEYS.GET_VIDEO_BY_ID, id)
    }, {
      immediate: true
    })

    onBeforeUnmount(() => { unwatch() })

    return {
      id,
      video,
      description
    }
  }
})
</script>
