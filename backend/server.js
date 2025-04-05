const app = require("./src/app.js");
const { config } = require("./src/config/config.js");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.set("io", io);

const PORT = config.PORT;
const mongoUrl = config.MONGO_URL;

const maxRetries = 5;
let retries = 0;

const connectWithRetry = () => {
  console.log(`MongoDB connection attempt ${retries + 1}`);

  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to database");
      server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((err) => {
      retries += 1;
      console.log(`Error connecting to database: ${err.message}`);
      if (retries < maxRetries) {
        console.log(
          `Retrying to connect to database (${retries}/${maxRetries})...`
        );
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log("Max retries reached. Could not connect to database.");
      }
    });
};

connectWithRetry();
