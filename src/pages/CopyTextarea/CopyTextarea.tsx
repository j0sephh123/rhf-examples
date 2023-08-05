import { useState } from "react";
import Copy from "./Copy/Copy";
import Textarea from "./Textarea/Textarea";
import { SetValue } from "./types";



const copyText = (value: string) => {
    navigator.clipboard.writeText(value);
  };

export default function CopyTextarea() {
    const [value, dispatchSetValue] = useState("");
    const setValue: SetValue = (newValue) => dispatchSetValue(newValue);

  return (
    <div className="flex mt-10 justify-center relative">
      <Copy onClick={() => copyText(value)} />
      <Textarea value={value} onChange={setValue} />
    </div>
  );
}
