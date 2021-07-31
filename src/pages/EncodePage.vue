<template>
  <div class="flex flex-col max-w-2xl mx-auto items-center mt-10">
    <div v-if="state.matches('initial')">
      <label class="btn bg-green-500 hover:bg-green-400"
        >Pick video
        <input
          type="file"
          class="hidden"
          @change="send('SET_FILE', { file: $event.target.files[0] })"
        />
      </label>
    </div>
    <div v-if="state.matches('ready')">
      {{ state.context.sourceFile?.name }}
      <button @click="send('CLEAR_FILE')">
        <vue-feather class="px-2 py-1" type="x-circle" stroke="red" />
      </button>
    </div>
    <div v-if="['initial', 'ready'].some(state.matches)">
      <button
        class="btn bg-green-500 hover:bg-green-400"
        :disabled="state.matches('ready') ? null : ''"
        :class="state.matches('ready') ? [] : 'opacity-50'"
        @click="send('ENCODE')"
      >
        Optimize
      </button>
    </div>
    <div v-if="state.matches('encoding')">
      {{ state.context.encodingStatus }}... {{ state.context.encodingProgress }}
    </div>
    <div v-if="state.matches('download')">
      <video controls :src="state.context.targetFile"></video>
      <a
        class="btn bg-green-500 hover:bg-green-400"
        :href="state.context.targetFile"
        :download="`Optimized ${state.context.sourceFile.name}`"
        >Download</a
      >
    </div>
  </div>
</template>
<script>
import { useMachine } from "@xstate/vue";
import stepsMachine from "../machines/stepsMachine";

export default {
  setup() {
    const { state, send, service } = useMachine(stepsMachine, {
      devTools: true,
    });
    service.subscribe((s) => {
      // eslint-disable-next-line no-console
      console.log(s);
    });
    return { state, send, console };
  },
};
</script>
