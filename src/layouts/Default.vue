<template>
  <header class="fixed flex bg-white bg-opacity-75 filter-blur-3 border-b border-gray-300 top-0 inset-x-0 h-16 items-center z-50">
    <div class="flex items-center justify-between w-full max-w-screen-xl relative mx-auto px-6">
      <h1 class="sm:text-xl font-bold duration-300">
        <router-link to="/">
          YouTube API With
          <span class="text-green-600">Vue 3</span>
        </router-link>
      </h1>
      <nav>
        <router-link
          class="flex items-center hover:text-green-400"
          to="/favorite"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span class="ml-1">
            收藏
          </span>
        </router-link>
      </nav>
    </div>
  </header>

  <main class="default:main pt-24 pb-16">
    <slot />
  </main>
  <footer class="bg-green-700 text-white">
    <div class="justify-between flex-wrap w-full max-w-screen-xl relative mx-auto px-6 py-4">
      <ul class="text-sm text-gray-300">
        <li>vue: 3.0.0-0</li>
        <li>vue-router: 4.0.0-0</li>
        <li>vuex: 4.0.0-0</li>
        <li>tailwindcss: 1.8.10</li>
      </ul>


      <p class="text-sm font-bold mt-2">
        純粹練習，設計風個參考自
        <a
          class="underline"
          target="_blank"
          rel="noopener"
          href="https://vuetelemetry.com/"
        >
          VueTelemetry
        </a>
        ，SVG 取自
        <a
          class="underline"
          target="_blank"
          rel="noopener"
          href="https://heroicons.com/"
        >
          heroicons
        </a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss">
nav .router-link-exact-active {
  @apply text-green-600;
}

.default\:main {
  min-height: 100vh;
}
</style>
