import { useRef } from "react";
import { addTodo } from "./store";

const CreateTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section>
      <input
        name="description"
        type="text"
        className="input input-bordered w-full"
        minLength={2}
        ref={inputRef}
      />
      <button
        className="btn btn-block mt-4"
        onClick={() => addTodo(inputRef.current?.value ?? "")}
      >
        Add new
      </button>
    </section>
  );
};

export default CreateTodo;
