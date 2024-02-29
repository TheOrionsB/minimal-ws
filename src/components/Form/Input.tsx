import { ChangeEventHandler, useRef } from "react";

const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full">
      <input
        disabled={props.disabled}
        ref={inputRef}
        placeholder={props.label}
        className="p-2 border-[1px] z-10 rounded bg-white bg-opacity-15 w-full border-solid border-black"
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

interface InputProps {
  disabled?: boolean;
  type: string;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: number | string;
}

export default Input;
