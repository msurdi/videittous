import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { assign, createMachine, sendParent } from "xstate";

const ffmpegArgs =
  "-i workfile -preset fast -movflags +faststart -max_muxing_queue_size 2048 -maxrate 6M -crf 19 tmp.mp4".split(
    " "
  );

export default createMachine(
  {
    id: "encoding",
    initial: "preparing",
    context: {
      ffmpeg: null,
      sourceFile: null,
      targetFile: null,
    },
    states: {
      preparing: {
        entry: sendParent(() => ({
          type: "ENCODING_STATUS",
          status: "preparing",
        })),
        invoke: {
          src: "loadFFMpeg",
          onDone: {
            target: "running",
            actions: assign({
              ffmpeg: (_, event) => event.data,
            }),
          },
          // TODO: Handle ffmpeg loading errors
          onError: {},
        },
      },
      running: {
        entry: sendParent(() => ({
          type: "ENCODING_STATUS",
          status: "running",
        })),
        invoke: {
          src: "encodeFile",
          onDone: {
            target: "completed",
            actions: assign({
              targetFile: (_, event) => event.data,
            }),
          },
          // TODO: Handle ffmpeg encoding errors
          onError: {
            target: "failed",
          },
        },
        on: {
          UPDATE_RATIO: {
            actions: sendParent((context, event) => ({
              type: "ENCODING_PROGRESS",
              progress: Math.trunc(event.ratio * 100),
            })),
          },
        },
      },
      completed: {
        entry: sendParent(() => ({
          type: "ENCODING_STATUS",
          status: "completed",
        })),
        type: "final",
        data: {
          targetFile: (context) => context.targetFile,
          success: true,
        },
      },
      failed: {
        entry: sendParent(() => ({
          type: "ENCODING_STATUS",
          status: "failed",
        })),
        data: {
          success: false,
        },
        type: "final",
      },
    },
  },
  {
    services: {
      loadFFMpeg: (context) => async () => {
        const { ffmpeg } = context;
        if (ffmpeg) {
          return ffmpeg;
        }
        const ffmpegInstance = createFFmpeg({
          log: true,
          corePath: "/ffmpeg/ffmpeg-core.js",
        });
        if (!ffmpegInstance.isLoaded()) {
          await ffmpegInstance.load();
        }
        return ffmpegInstance;
      },
      encodeFile: (context) => async (callback) => {
        const { ffmpeg } = context;
        ffmpeg.setProgress(({ ratio }) => {
          callback({ type: "UPDATE_RATIO", ratio });
        });

        ffmpeg.FS("writeFile", "workfile", await fetchFile(context.sourceFile));

        await ffmpeg.run(...ffmpegArgs);
        const data = ffmpeg.FS("readFile", "tmp.mp4");
        return URL.createObjectURL(
          new Blob([data.buffer], { type: "video/mp4" })
        );
      },
    },
  }
);
