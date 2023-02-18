const { io } = require("socket.io-client");
const socket = io("https://shopzone.onrender.com");
socket.on("connect", () => {
  console.log("connected");
});
socket.on("disconnect", () => {
  console.log("Disconnected");
});
export default socket
