<template>
  <div>
    {{ state.value }}
    <span v-if="state.matches('running')"> {{ state.context.progress }}% </span>
  </div>
  <div class="w-full">
    <progress
      class="progress progress-success"
      :value="state.context.progress"
      max="100"
    ></progress>
  </div>
</template>
<script>
import { useActor } from "@xstate/vue";

export default {
  props: {
    service: { type: Object, required: true },
  },
  setup(props) {
    const { state } = useActor(props.service);
    return { state };
  },
};
</script>
