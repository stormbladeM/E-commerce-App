import { Children } from "react";

function Button({ onClick, children, type }) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
