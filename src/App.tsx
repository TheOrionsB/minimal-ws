import { useEffect, useReducer, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Input from "./components/Form/Input";
import Button from "./components/Form/Button";
import SocketBuilder from "./components/Socket/SocketBuilder";
import {
  WSConfigInitialState,
  WSConfigReducer,
} from "./reducers/WSConfigReducer";
import {
  WSConfigContext,
  WSConfigDispatchContext,
} from "./contexts/WSConfigContext";

function App() {
  const [socketUrl, setSocketUrl] = useState("wss://echo.websocket.org/");
  const [message, setMessage] = useState("");
  const [WSConfig, dispatch] = useReducer(
    WSConfigReducer,
    WSConfigInitialState
  );
  const [messageHistory, setMessageHistory] = useState<
  {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: MessageEvent<any> | { data: string };
      type: "server" | "client";
    }[]
  >([]);

  const { readyState, sendMessage, lastMessage } = useWebSocket(socketUrl);
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const getWSUrl = () => {
    const paramsMap = WSConfig.queryParams.map(
      (value) => `${value.key}=${value.value}`
    );
    return `${WSConfig.socketProtocol}://${WSConfig.url}${
      paramsMap.length > 0 ? `?${paramsMap.join("&")}` : ""
    }`;
  };

  useEffect(() => {
    if (lastMessage)
      setMessageHistory((state) => [
        ...state,
        { message: lastMessage, type: "server" },
      ]);
  }, [lastMessage]);

  return (
    <WSConfigContext.Provider value={WSConfig}>
      <WSConfigDispatchContext.Provider value={dispatch}>
        <div className="bg-slate-900 text-white h-screen absolute top-0 left-0 w-full overflow-y-scroll flex flex-col">
          <div className="flex flex-row h-full p-10 gap-x-10">
            <div className="w-1/3 flex flex-col gap-y-10">
              <div className="border-[1px] rounded p-4 ">
                <SocketBuilder />
              </div>
            </div>
            <div className="w-2/3 flex flex-col h-full justify-between p-4 border-[1px] rounded">
              <p className="text-lg">Websocket chat</p>
              <div className="flex flex-row align-bottom gap-x-2">
                <Input
                  type="text"
                  label="Websocket url2"
                  value={getWSUrl()}
                  disabled
                />
                <Button
                  onClick={() => {
                    setSocketUrl(getWSUrl());
                  }}
                >
                  {socketUrl === getWSUrl()
                    ? connectionStatus
                    : "URL Mismatch, re-connect."}
                </Button>
              </div>
              <div
                id="scroller"
                className="bg-slate-800 h-3/4 p-4 overflow-y-scroll flex flex-col gap-y-2"
              >
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
                <div id="anchor" className="self-end"></div>
              </div>
              <div className="flex flex-row items-baseline gap-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  label="Text message"
                />
                <Button
                  onClick={() => {
                    sendMessage(message);
                    setMessageHistory((state) => [
                      ...state,
                      { type: "client", message: { data: message } },
                    ]);
                  }}
                  class="place-self-center"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </WSConfigDispatchContext.Provider>
    </WSConfigContext.Provider>
  );
}

export default App;
