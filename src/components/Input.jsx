import { forwardRef, useId } from "react";

function Input({ label, className = "", type = "text", ...props }, ref) {
  const id = useId();
  return (
    <div className={`input ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} {...props} id={id} ref={ref} />
    </div>
  );
}

export default forwardRef(Input);
