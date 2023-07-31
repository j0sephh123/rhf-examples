import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  className,
  ...props
}) => {
  return (
    <div className="input-container">
      {label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        className={clsx(
          "input input-bordered",
          className,
          errorMessage && "input-error"
        )}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default Input;
