function Button({
  children,
  type = "button",
  bgColor = "blue",
  textColor = "white",
  className,
  ...props
}) {
  return (
    <button
      type={type}
      style={{ backgroundColor: bgColor, color: textColor }}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
