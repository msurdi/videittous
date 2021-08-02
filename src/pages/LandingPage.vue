<template>
  <main class="flex flex-col items-center my-5 px-4 max-w-xl mx-auto">
    <div class="text-6xl font-bold tracking-wide">Videittous</div>
    <div class="text-base my-5">
      <p class="my-5">Convert any video in a small, widely compatible MP4.</p>
    </div>
    <div class="my-5">
      <router-link :to="{ name: 'encode' }" class="btn btn-success"
        >Get started</router-link
      >
    </div>
    <FeatureList class="my-5">
      <FeatureListItem>Easy to use.</FeatureListItem>
      <FeatureListItem
        >No ads, no watermarks, we don't save your videos.</FeatureListItem
      >
      <FeatureListItem>It's free. </FeatureListItem>
      <FeatureListItem
        >The video is never uploaded, all the work is performed in your browser.
      </FeatureListItem>
      <FeatureListItem
        >Only limited by your own computer's power.
      </FeatureListItem>
      <FeatureListItem>No registration and no login required.</FeatureListItem>
      <FeatureListItem
        ><a class="link" href="https://github.com/msurdi/videittous"
          >Open source</a
        >.</FeatureListItem
      >
    </FeatureList>
  </main>
</template>

<script>
import FeatureList from "../components/FeatureList.vue";
import FeatureListItem from "../components/FeatureListItem.vue";

export default {
  components: {
    FeatureList,
    FeatureListItem,
  },
  setup() {},
};
</script>
