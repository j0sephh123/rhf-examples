import CreateTodo from "./CreateTodo";
import Filters from "./Filters";
import Todos from "./Todos";

const ValtioBasics = () => (
  <main>
    <h1 className="text-3xl">
      To-do List with Valtio{" "}
      <span role="img" aria-label="pen">
        ✏️
      </span>
    </h1>
    <Filters />
    <Todos />
    <CreateTodo />
  </main>
);

export default ValtioBasics;
