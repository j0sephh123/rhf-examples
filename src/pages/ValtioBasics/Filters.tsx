import { useSnapshot } from "valtio";
import { setFilter, store } from "./store";
import { Filter } from "./types";

const filterValues: Filter[] = ["all", "pending", "completed"];

const Filters = () => {
  const snap = useSnapshot(store);
  return (
    <nav className="my-4 flex gap-4">
      {filterValues.map((filter) => (
        <div className="flex" key={filter}>
          <input
            name="filter"
            type="radio"
            value={filter}
            checked={snap.filter === filter}
            onChange={() => setFilter(filter)}
            className="radio mr-4"
          />
          <label>{filter}</label>
        </div>
      ))}
    </nav>
  );
};

export default Filters;