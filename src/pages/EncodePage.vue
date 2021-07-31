<template>
  <div class="flex flex-col max-w-2xl mx-auto items-center mt-10">
    <EncodingStep
      v-if="['initial', 'ready'].some(state.matches)"
      class="flex flex-col items-center"
    >
      <div v-if="state.matches('initial')">
        <label class="btn btn-success"
          >Click here to select video to optimize
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
      <div>
        {{ state.context.encodingStatus }}
        <span v-if="state.context.encodingStatus === 'running'">
          {{ state.context.encodingProgress }}%
        </span>
      </div>
      <div class="w-full">
        <progress
          class="progress progress-success"
          :value="state.context.encodingProgress"
          max="100"
        ></progress>
      </div>
    </EncodingStep>
    <EncodingStep v-if="state.matches('download')" class="flex flex-col">
      <video controls :src="state.context.targetFile" class="my-4"></video>
      <div class="flex justify-between items-end">
        <router-link class="link" :to="{ name: 'encode' }"
          >Optimize another video</router-link
        >
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

export default {
  components: {
    EncodingStep,
  },
  setup() {
    const { state, send, service } = useMachine(stepsMachine, {
      devTools: true,
    });
    service.subscribe((s) => {
      // eslint-disable-next-line no-console
      console.log(s);
    });
    return { state, send };
  },
};
</script>
