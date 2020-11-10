const express = require("express");
const http = require("http");
const socket = require("socket.io");

const port = process.env.PORT || 3001;

app = express();
app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);
const io = socket(server);

io.on("connect", function(socket) {

});

let counter = 0;

setInterval(function() {
    let msg = (Math.sin(16 * counter / 1000 * 2 * Math.PI * 0.5) * 10).toString();
    io.emit("update", msg);
    counter++;
}, 16);

app.get("/", function(req, res){
    res.render("index.html");
})

server.listen(port);