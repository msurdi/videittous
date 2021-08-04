<template>
  <div class="flex flex-col max-w-2xl mx-auto items-center mt-10">
    <EncodingStep
      v-if="['initial', 'ready'].some(state.matches)"
      class="flex flex-col items-center"
    >
      <div v-if="state.matches('initial')">
        <label class="btn btn-success"
          >Pick video...
          <input
            type="file"
            class="hidden"
            @change="send('SET_FILE', { file: $event.target.files[0] })"
          />
        </label>
      </div>
      <div v-if="state.matches('ready')" class="flex">
        <span class="break-all self-start">
          {{ state.context.sourceFile?.name }}
        </span>
        <button class="px-2 flex" @click="send('CLEAR_FILE')">
          <vue-feather type="x-circle" stroke="red" />
        </button>
      </div>
      <div class="my-8">
        <button
          class="btn btn-success"
          :disabled="state.matches('ready') ? null : ''"
          :class="state.matches('ready') ? [] : 'opacity-50'"
          @click="send('ENCODE')"
        >
          Optimize video
        </button>
      </div>
    </EncodingStep>
    <EncodingStep
      v-if="state.matches('encoding')"
      class="flex flex-col items-center w-full"
    >
      <EncodingProgress
        v-if="state.children.encoding"
        :service="state.children.encoding"
      />
    </EncodingStep>
    <EncodingStep v-if="state.matches('download')" class="flex flex-col">
      <video controls :src="state.context.targetFile" class="my-4"></video>
      <div class="flex justify-between items-end">
        <button class="link" :to="{ name: 'encode' }" @click="send('RESTART')">
          Optimize another video
        </button>
        <a
          class="btn btn-success"
          :href="state.context.targetFile"
          :download="`Optimized ${state.context.sourceFile.name}`"
          >Download</a
        >
      </div>
    </EncodingStep>
    <EncodingStep v-if="state.matches('failure')">
      <div class="alert alert-error">
        ooops... Something went wrong. Please,&nbsp;
        <router-link class="link" :to="{ name: 'encode' }"
          >try again</router-link
        >
      </div>
    </EncodingStep>
  </div>
</template>
<script>
import { useMachine } from "@xstate/vue";
import stepsMachine from "../machines/stepsMachine";
import EncodingStep from "../components/EncodingStep.vue";
import debug from "../machines/debug";
import EncodingProgress from "../components/EncodingProgress.vue";

export default {
  components: {
    EncodingStep,
    EncodingProgress,
  },
  setup() {
    const { state, send, service } = useMachine(stepsMachine, {
      devTools: true,
    });
    debug(service);
    return { state, send };
  },
};
</script>
