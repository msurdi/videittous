<template>
  <main class="flex flex-col items-center mt-12 px-4 max-w-xl mx-auto">
    <div class="text-6xl font-bold">Videittous</div>
    <div class="">The easiest way to optimize any video file</div>
    <div class="text-base mt-12">
      <p class="my-6">
        Videittous allows you to optimize any video you might have so that it
        can be played anywhere at the minimum size possible.
      </p>
      <FeatureList>
        <FeatureListItem>Easy to use.</FeatureListItem>
        <FeatureListItem
          >No ads, no watermarks, we don't save your videos.</FeatureListItem
        >
        <FeatureListItem>It's free. </FeatureListItem>
        <FeatureListItem
          >The video is never uploaded, all the work is performed in your
          browser.
        </FeatureListItem>
        <FeatureListItem
          >Only limited by your own computer's power.
        </FeatureListItem>
      </FeatureList>
    </div>
    <div class="mt-12">
      <router-link :to="{ name: 'encode' }" class="btn btn-success"
        >Get started</router-link
      >
    </div>
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
