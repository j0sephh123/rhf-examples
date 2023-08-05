import { PropsWithChildren } from "react";

type Props = {
  htmlFor: string;
  text: string;
  errorMessage?: string;
};

export default function FormControl({
  children,
  htmlFor,
  text,
  errorMessage,
}: Props & PropsWithChildren) {
  return (
    <div className="form-control">
      <label htmlFor={htmlFor} className="label">
        <span className="label-text">{text}</span>
      </label>
      {children}
      {errorMessage && (
        <p className="text-error text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
