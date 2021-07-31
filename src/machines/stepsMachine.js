import { assign, createMachine } from "xstate";
import encodingMachine from "./encodingMachine";

const initialContext = {
  sourceFile: null,
  targetFile: null,
  encodingStatus: null,
  encodingProgress: 0,
};

export default createMachine(
  {
    id: "steps",
    context: initialContext,
    initial: "initial",
    states: {
      initial: {
        on: {
          SET_FILE: {
            target: "ready",
            actions: assign({
              sourceFile: (_context, event) => event.file,
            }),
          },
        },
      },
      ready: {
        on: {
          ENCODE: {
            target: "encoding",
          },
          CLEAR_FILE: {
            target: "initial",
            actions: assign({
              sourceFile: () => null,
            }),
          },
        },
      },
      encoding: {
        on: {
          ENCODING_STATUS: {
            actions: assign({
              encodingStatus: (_, event) => event.status,
            }),
          },
          ENCODING_PROGRESS: {
            actions: assign({
              encodingProgress: (_, event) => event.progress,
            }),
          },
        },
        invoke: {
          id: "encoding",
          src: encodingMachine,
          data: {
            sourceFile: (context) => context.sourceFile,
          },
          onDone: [
            {
              target: "download",
              cond: (context, event) => event.data.success,
              actions: assign({
                targetFile: (_, event) => event.data.targetFile,
              }),
            },
            {
              target: "failure",
              cond: (context, event) => !event.data.success,
            },
          ],
          onError: {
            target: "failure",
          },
        },
      },
      download: {
        on: {
          RESTART: {
            target: "initial",
            actions: assign(() => initialContext),
          },
        },
      },
      failure: {},
    },
  },
  {
    actions: {},
  }
);
