<template>
  <div
    ref="thumbnal"
    :style="style"
  />
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'

let cachedObserver!: IntersectionObserver
const IntersectionObserver =
  typeof window !== 'undefined' ? window.IntersectionObserver : null

function createObserve (
  handler: (entry: IntersectionObserverEntry) => void
) {

  return new IntersectionObserver!(
    entries => { entries.forEach(handler) },
    { threshold: 1 }
  )
}

const listeners = new Map<Element, () => void>()
function getObserver (): IntersectionObserver | undefined {
  if(cachedObserver) {
    return cachedObserver
  }


  return (cachedObserver = createObserve(({ target, intersectionRatio  }) => {
    if(!listeners.has(target)) {
      return
    }

    const cb = listeners.get(target)!

    if(intersectionRatio) {
      cachedObserver.unobserve(target)
      listeners.delete(target)
      cb()
    }
  }))
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
  name: 'VideoThumbnal',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup (props) {
    // 灰色 base64 圖片
    const bgURL = ref('data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==')
    const thumbnal = ref<HTMLDivElement>()

    const style = computed(() => ({
      backgroundImage: `url(${bgURL.value})`
    }))

    onMounted(() => {
      const unListen = listenToIntersections(thumbnal.value!, () => {
        bgURL.value = props.url
      })
      onBeforeUnmount(unListen)
    })

    return {
      style,
      thumbnal
    }
  }
})
</script>
