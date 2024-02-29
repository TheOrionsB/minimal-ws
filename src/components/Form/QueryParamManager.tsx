import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import {
  WSConfigContext,
  WSConfigDispatchContext,
} from "../../contexts/WSConfigContext";

const QueryParamManager = (props: QueryParamManagerProps) => {
  const [toAddValues, setToAddValues] = useState({ key: "", value: "" });
  const [areParamsShown, setAreParamsShown] = useState(true);
  const dispatch = useContext(WSConfigDispatchContext);
  const WSConfig = useContext(WSConfigContext);

  const handleRemoveParam = (key: string) => {
    if (!dispatch || !WSConfig) return;
    const idx = WSConfig?.queryParams.findIndex((value) => value.key === key);
    if (idx === -1) return;
    const tmpParams = WSConfig?.queryParams
    tmpParams.splice(idx, 1);
    dispatch({
      type: "UPDATE",
      payload: { ...WSConfig, queryParams: tmpParams! },
    });
  };

  if (!WSConfig || !dispatch) return <p>loading..</p>;
  return (
    <div>
      <label>{props.label}</label>
      <div className="flex flex-row gap-x-3">
        <div>
          <label>Key</label>
          <Input
            type="text"
            value={toAddValues.key}
            label="Query param key"
            onChange={(e) =>
              setToAddValues((state) => ({ ...state, key: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Value</label>
          <Input
            type="text"
            value={toAddValues.value}
            onChange={(e) =>
              setToAddValues((state) => ({ ...state, value: e.target.value }))
            }
            label="Query param value"
          />
        </div>
        <Button
          class="w-1/3 p-2 self-end"
          onClick={() => {
            dispatch({
              type: "UPDATE",
              payload: {
                ...WSConfig,
                queryParams: [...WSConfig.queryParams, toAddValues],
              },
            });
          }}
        >
          Add
        </Button>
      </div>
      <div className="w-full flex items-center justify-center p-2">
        <Button onClick={() => setAreParamsShown(!areParamsShown)}>
          {areParamsShown ? "Hide parameters" : "Show parameters"}
        </Button>
      </div>
      <div
        className={` overflow-y-auto ${
          areParamsShown ? "opacity-100 h-[30vh]" : "opacity-0 h-0"
        } transition-all ease-in-out duration-300 flex flex-col gap-y-2`}
      >
        <div
          className={`${
            areParamsShown ? "opacity-100" : "opacity-0"
          } transition-all ease-in-out duration-200 flex flex-row gap-x-2`}
        >
          <p className="font-bold w-1/3">Key</p>
          <p className="font-bold w-1/3">Value</p>
          <p className="font-bold w-1/3">Action</p>
        </div>
        {WSConfig.queryParams.map((value) => (
          <div
            className={`${
              areParamsShown ? "opacity-100" : "opacity-0"
            } transition-all ease-in-out duration-200 flex flex-row gap-x-2`}
          >
            <p className="font-bold w-1/3">{value.key}</p>
            <p className="font-bold w-1/3">{value.value}</p>
            <Button
              class="bg-red-400"
              onClick={() => handleRemoveParam(value.key)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface QueryParamManagerProps {
  value: string;
  removable: boolean;
  maxHeight: string;
  onAddition: (toAdd: string) => void;
  label: string;
}

export default QueryParamManager;
