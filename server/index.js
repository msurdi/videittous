require("express-async-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const PORT = process.env.PORT ?? 8080;
const ADDRESS = process.env.ADDRESS ?? "0.0.0.0";

const STATIC_DIR = path.resolve(__dirname, "../dist");
const INDEX_FILE = path.resolve(STATIC_DIR, "index.html");
const devMode = process.env.NODE_ENV === "development";

const app = express();

app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: devMode
      ? false
      : {
          useDefaults: true,
          directives: {
            "script-src": ["'self'", "blob:", "'unsafe-eval'"],
            "media-src": ["'self'", "blob:"],
            "default-src": ["'self'", "blob:"],
          },
        },
    hsts: !devMode,
  })
);

app.use(express.static(STATIC_DIR));
app.get("/status", (req, res) => res.send("ok"));

app.get("*", (req, res) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.sendFile(INDEX_FILE);
});

app.listen(PORT, ADDRESS, () => {
  // eslint-disable-next-line no-console
  console.log("Server up and running on ", `http://${ADDRESS}:${PORT}/`);
});
