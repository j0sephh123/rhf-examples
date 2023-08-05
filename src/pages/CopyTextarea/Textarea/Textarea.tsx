import { SetValue } from "../types";

type Props = {
  value: string;
  onChange: SetValue;
};

export default function Textarea({ value, onChange }: Props) {
  return (
    <>
      <textarea
        autoFocus
        className="textarea textarea-lg w-full max-w-5xl border-zinc-400"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </>
  );
}
