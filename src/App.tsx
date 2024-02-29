import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Input from "./components/Form/Input";

function App() {
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org/");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    {
      message: MessageEvent<any> | { data: string };
      type: "server" | "client";
    }[]
  >([]);
  const { readyState, sendMessage, lastMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage)
      setMessageHistory((state) => [
        ...state,
        { message: lastMessage, type: "server" },
      ]);
  }, [lastMessage]);
  return (
    <div className="bg-slate-900 text-white h-screen absolute top-0 left-0 w-full overflow-y-scroll flex flex-col">
      <div className="flex flex-row h-full">
        <div className="w-1/3"></div>
        <div className="w-2/3 flex flex-col h-full justify-between py-10">
          <p>Get information</p>
          <Input
            type="text"
            label="Websocket url2"
            onChange={(e) => setSocketUrl(e.target.value)}
            value={socketUrl}
          />
          {readyState === 1 ? (
            <div className="bg-slate-800 h-3/4 p-4 overflow-y-scroll flex flex-col gap-y-2">
              {/* <div>{lastMessage?.data}</div> */}
              {messageHistory.map((value) => (
                <div
                  className={`${
                    value.type === "client" ? "self-end" : "self-start"
                  } min-w-1/4 text-black flex flex-col gap-y-1`}
                >
                  <p className="text-white">
                    {value.type === "client" ? "Me" : "Server"}
                  </p>
                  <div
                    className={`${
                      value.type === "client" ? "bg-blue-400" : `bg-white`
                    } p-2 rounded`}
                  >
                    {value?.message.data}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            label="Text message"
          />

          <button
            onClick={() => {
              sendMessage(message);
              setMessageHistory((state) => [
                ...state,
                { type: "client", message: { data: message } },
              ]);
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
