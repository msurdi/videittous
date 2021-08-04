import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { assign, createMachine } from "xstate";

const ffmpegArgs =
  "-i workfile -preset fast -movflags +faststart -max_muxing_queue_size 2048 -maxrate 6M -crf 19 tmp.mp4".split(
    " "
  );

export default createMachine(
  {
    id: "encoding",
    initial: "preparing",
    context: {
      progress: 0,
      ffmpeg: null,
      sourceFile: null,
      targetFile: null,
    },
    states: {
      preparing: {
        invoke: {
          src: "loadFFMpeg",
          onDone: {
            target: "running",
            actions: assign({
              ffmpeg: (_, event) => event.data,
            }),
          },
          onError: {
            target: "failed",
          },
        },
      },
      running: {
        invoke: {
          src: "encodeFile",
          onDone: {
            target: "completed",
            actions: assign({
              targetFile: (_, event) => event.data,
            }),
          },
          onError: {
            target: "failed",
          },
        },
        on: {
          UPDATE_RATIO: {
            actions: assign((context, event) => ({
              progress: Math.trunc(event.ratio * 100),
            })),
          },
        },
      },
      completed: {
        type: "final",
        data: {
          targetFile: (context) => context.targetFile,
          success: true,
        },
      },
      failed: {
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
