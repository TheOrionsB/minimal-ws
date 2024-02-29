import { MouseEventHandler, PropsWithChildren } from "react";

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} className={`p-1 bg-blue-400 rounded w-[30%] text-black ${props.class}`}>
      {props.children}
    </button>
  );
};

interface ButtonProps extends PropsWithChildren {
  onClick: MouseEventHandler;
  class?: string;
}

export default Button;
