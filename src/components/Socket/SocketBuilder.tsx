import { useContext } from "react";
import Input from "../Form/Input";
import QueryParamManager from "../Form/QueryParamManager";
import {
  WSConfigContext,
  WSConfigDispatchContext,
} from "../../contexts/WSConfigContext";

const SocketBuilder = () => {
  const WSConfig = useContext(WSConfigContext);
  const dispatch = useContext(WSConfigDispatchContext);

  if (!WSConfig || !dispatch) return <>loading...</>;
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-2xl">Socket connection details</p>
      <div className="flex flex-col gap-y-2">
        <div>
          <label>Socket protocol</label>
          <select
            about="procotol"
            className="w-full p-2 bg-white bg-opacity-15 rounded"
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                payload: { ...WSConfig, socketProtocol: e.target.value },
              })
            }
          >
            <option defaultChecked value={"wss"}>
              WSS
            </option>
            <option value={"ws"}>WS</option>
          </select>
        </div>
        <div>
          <label>Socket URL</label>
          <Input
            value={WSConfig.url}
            onChange={(e) =>
              dispatch({
                type: "UPDATE",
                payload: { ...WSConfig, url: e.target.value },
              })
            }
            type="text"
            label="Socket url"
          ></Input>
        </div>
        <div>
          <QueryParamManager
            label="QueryParm"
            maxHeight=""
            onAddition={() => null}
            removable={true}
            value=""
          />
        </div>
      </div>
    </div>
  );
};

export default SocketBuilder;
