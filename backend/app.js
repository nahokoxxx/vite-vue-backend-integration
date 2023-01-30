const express = require("express");
const mustacheExpress = require("mustache-express");
const proxy = require("proxy-middleware");
const url = require("url");

const app = express();
const port = 3000;

const dev = process.env.NODE_ENV === "development";
const frontendBaseUrl = process.env.FRONTEND_BASE_URL

if (dev) {
  app.use("/src/assets", proxy(url.parse(`${frontendBaseUrl}/src/assets`)));
}

app.use(express.static("public"));

app.set("view engine", "mustache");
app.engine("mustache", mustacheExpress());

app.get("/", (_req, res) => {
  res.render("index", { devFiles: getDevFiles(), prodFiles: getProdFiles() });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function getDevFiles() {
  if (!dev) {
    return null;
  }

  return {
    vite: `${frontendBaseUrl}/@vite/client`,
    main: `${frontendBaseUrl}/src/main.js`,
  }
}

function getProdFiles() {
  if (dev) {
    return null;
  }

  const manifest = require("./public/manifest.json");
  if (!manifest) {
    throw new Error("Build frontend with production mode first.")
  }
  const { css, file: js } = manifest["src/main.js"];

  return { css, js };
}
