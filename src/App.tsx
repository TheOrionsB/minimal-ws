import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useWebSocket from "react-use-websocket";

function App() {
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org/");
  const [message, setMessage] = useState("");
  const { readyState, sendMessage, lastMessage } = useWebSocket(socketUrl);

  return (
    <>
      <div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>socket url</label>
          <input
            onChange={(e) => setSocketUrl(e.target.value)}
            value={socketUrl}
            type="text"
            placeholder="websocket url"
          />
        </div>
        {readyState === 1 ? (
          <div>
            <div>{lastMessage?.data}</div>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="message"
            />
            <button onClick={() => sendMessage(message)}>send</button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
