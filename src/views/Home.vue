<template>
  <div class="w-full max-w-screen-xl relative mx-auto px-6">
    <div class="flex items-stretch flex-wrap -m-2">
      <video-list :videos="videos" />
    </div>
    <div
      v-if="canLoad"
      ref="observerDOM"
      class="text-center font-bold select-none mt-8 "
    >
      LOADING
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { ACTIONS_KEYS } from '@/store/actions'
import VideoList from '@/components/VideoList.vue'

let cachedObserver!: IntersectionObserver
const IntersectionObserver =
  typeof window !== 'undefined' ? window.IntersectionObserver : null

const listeners = new Map<Element, () => void>()
function createObserver (
  handler: (entry: IntersectionObserverEntry) => void
) {
  return new IntersectionObserver!((enterys) => {
    enterys.forEach(handler)
  }, {
    threshold: 1,
  })
}

function getObserver () {
  if(cachedObserver) {
    return cachedObserver
  }

  if(!IntersectionObserver) {
    return undefined
  }

  return (
    cachedObserver = createObserver(({ target, intersectionRatio }) => {
      let cb!: (() => void) | undefined

      if(!(cb = listeners.get(target))) {
        return
      }

      if(intersectionRatio) {
        cachedObserver.unobserve(target)
        listeners.delete(target)
        cb()
      }
    })
  )
}

function listenToIntersections (el: Element, cb: () => void) {
  const observer = getObserver()

  if(!observer) {
    return () => {}
  }

  observer.observe(el)
  listeners.set(el, cb)

  return () => {
    observer.unobserve(el)
    listeners.delete(el)
  }
}

export default defineComponent({
  components: {
    VideoList
  },
  setup () {
    const limit = 10 // 最多自動載入 10 次
    const observerDOM = ref<HTMLDivElement>()
    const store = useStore()
    const videos = computed(() => store.state.videos)

    const currentPage = ref(1)
    const canLoad = computed(() => currentPage.value < limit)

    const nextPageToken = computed(() => {
      const { metadata } = store.state
      return metadata ? metadata.nextPageToken : undefined
    })

    const loadVideos = () => {
      return store
        .dispatch(ACTIONS_KEYS.GET_VIDEOS, nextPageToken.value)
        .then(() => {
          currentPage.value += 1
        })
    }

    const initInfinityScroll = () => {
      let unlisten!: () => void
      const el = observerDOM.value!

      const observeCallback = async () => {
        await loadVideos()
        if(canLoad.value) {
          unlisten = listenToIntersections(el, observeCallback)
          return
        }
        unlisten()
      }

      unlisten = listenToIntersections(el, observeCallback)
      onBeforeUnmount(unlisten)
    }

    onMounted(() => { initInfinityScroll() })

    return {
      observerDOM,
      videos,
      canLoad
    }
  }
})
</script>
