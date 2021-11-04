const express = require("express");
const path = require("path");

const app = express();

const filesPath = path.resolve(__dirname, "pages");

app.set("x-powered-by", false);

app.get("/", (req, res) => {
    res.sendFile(path.join(filesPath, "index.html"));
});

const staticFiles = ["js"];

staticFiles.forEach((val) => {
    app.get(`/${val}/:file`, express.static(path.resolve(filesPath, "assets")));
});


const port = 1239;
const startUrl = `http://localhost:${port}/`;

app.listen(port, () => {
    console.log(`Express server started at ${startUrl}`);
});

const { exec } = require("child_process");

let start = (process.platform === "darwin"? "open" : process.platform === "win32"? "start" : "xdg-open");
exec(start + " " + startUrl);


