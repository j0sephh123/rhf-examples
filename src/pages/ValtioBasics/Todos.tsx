import { useSnapshot } from "valtio";
import { removeTodo, store, toggleDone } from "./store";
import clsx from "clsx";

const Todos = () => {
  const snap = useSnapshot(store);
  return (
    <ul>
      {snap.todos
        .filter(({ status }) => status === snap.filter || snap.filter === "all")
        .map(({ description, status, id }) => {
          return (
            <li key={id} className="p-2 my-2 flex items-center">
              <span
                onClick={() => toggleDone(id, status)}
                data-status={status}
                className={clsx(status === "completed" && "line-through")}
              >
                {description}
              </span>
              <button
                onClick={() => removeTodo(id)}
                className="btn btn-sm ml-4"
              >
                x
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default Todos;
