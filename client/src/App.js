/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

// connect to our socket.io backend
const socket = io.connect("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      // emit "join_room" event with the room string
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    // emit an event to socket.io backend for the room
    socket.emit("send_message", { message: message, room: room });
  };

  // when an event is received, run this because socket is the dependency
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        placeholder="Room number"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>

      <br />

      <input
        type="text"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
