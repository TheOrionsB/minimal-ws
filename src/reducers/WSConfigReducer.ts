export const WSConfigInitialState = {
  url: "echo.websocket.org",
  socketProtocol: "wss",
  queryParams: [],
  messageType: "text",
};

export const WSConfigReducer = (
  state: IWSConfig,
  action: { type: string; payload: IWSConfig }
) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export interface IWSConfig {
  url: string;
  socketProtocol: string;
  queryParams: { key: string; value: string }[];
  messageType: string;
}
