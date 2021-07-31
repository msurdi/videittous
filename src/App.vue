<template>
  <header class="bg-black text-white p-4 font-bold text-xl">
    <router-link :to="{ name: 'landing' }">Videittous</router-link>
  </header>

  <router-view></router-view>
</template>
