import clsx from "clsx";

type Props = {
  isLoading: boolean;
};

export default function Button({ isLoading = false }: Props) {
  return (
    <button
      type="submit"
      className={clsx(
        "mt-4 btn-neutral btn btn-block",
        isLoading && "btn-disabled"
      )}
    >
      {isLoading ? "Loading..." : "Submit"}
    </button>
  );
}
