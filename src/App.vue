<template>
  <header
    class="bg-black text-white p-4 font-bold text-xl flex justify-between"
  >
    <router-link :to="{ name: 'landing' }">Videittous</router-link>
    <a href="https://github.com/msurdi/videittous">
      <vue-feather class="px-2" type="github" />
    </a>
  </header>

  <router-view></router-view>
</template>
