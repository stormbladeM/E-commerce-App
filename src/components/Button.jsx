function Button({
  onClick,
  width = 50,
  padding = 5,
  color = "grey",
  children,
}) {
  const style = {
    padding: `${padding}px`,
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "10px",
    width: `${width}%`,
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default Button;
