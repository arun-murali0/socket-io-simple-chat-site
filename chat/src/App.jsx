import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// socket
import { io } from "socket.io-client";
// creating socket connection
const socket = io.connect("http://localhost:4000");

function App() {
  // set for managing messages for sending
  const [message, setMessage] = useState("");
  // state for all chats
  const [chat, setChat] = useState([]);
  const userName = nanoid(6);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  return (
    <main id="chat_content">
      <h1>Chat-app</h1>
      <div className="header">
        <p className="chat_message">
          {chat.map((payload, index) => {
            return (
              <div key={index}>
                {payload.message}:<span>ID:{payload.userName}</span>
              </div>
            );
          })}
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            placeholder="Enter Here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>send</button>
        </form>
      </div>
    </main>
  );
}

export default App;
