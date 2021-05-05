const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
const router = require("./router");

io.on("connection", (socket) => {
  console.log("we are connected to server!!!");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);

  });

  socket.on("disconnect", () => {
    console.log("User has left!!!");
  })
});

app.use(router);

httpServer.listen(PORT, () => console.log(`server is started ${PORT}`));
