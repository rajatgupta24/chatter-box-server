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
const { addUser, removeUser, getAdd, getUsersInRoom, getUser } = require("./users");

io.on("connection", (socket) => {
  console.log("we are connected to server!!!");


  socket.on("join", ({ name, room }, callback) => {
    const {user, error} = addUser({ id: socket.id, name, room });
    
    if (error) return callback(error);

    socket.emit("message", {user: "admin", text:`${user.name} welcome to the room`});
    socket.broadcast.to(user.room).emit("message", { user: "admin", text:`${user.name} has joined` });

    socket.join(user.room);
    callback()
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);
    io.to(user.room).emit("message", { user: user.name, text: message});
    console.log(message);

  });

  socket.on("disconnect", () => {
    console.log("User has left!!!");
  })
});

app.use(router);

httpServer.listen(PORT, () => console.log(`server is started ${PORT}`));
