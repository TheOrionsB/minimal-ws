import { ChangeEventHandler, useRef, useState } from "react";

const Input = (props: InputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    setFocused(true);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="w-full">
      <p
        onClick={handleFocus}
        className={`${
          focused || props.value ? "" : "text-gray-500 translate-y-[100%]"
        } p-2 cursor-text transition-all ease-in-out`}
      >
        {props.label}
      </p>
      <input
        ref={inputRef}
        className="p-2 border-[1px] z-10 rounded bg-white bg-opacity-15 w-full border-solid border-black"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};

interface InputProps {
  type: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number | string;
}

export default Input;
