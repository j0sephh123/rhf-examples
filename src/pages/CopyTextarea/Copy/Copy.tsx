import clsx from "clsx";
import { useEffect, useState } from "react";
import CopiedIcon from "../../../icons/CopiedIcon";
import CopyIcon from "../../../icons/CopyIcon";

type TooltipText = "copy" | "copied";

type Props = {
  onClick: VoidFunction;
};

export default function Copy({ onClick }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const tooltipText: TooltipText = isClicked ? "copied" : "copy";

  const handleTooltipClick = () => {
    onClick();
    setIsClicked(true);
  };

  useEffect(() => {
    if (!isClicked) return;

    const timeout = window.setTimeout(() => {
      setIsClicked(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isClicked]);

  return (
    <div
      className="absolute tooltip tooltip-left right-3 top-2 tooltip-accent"
      data-tip={tooltipText}
    >
      <button
        onClick={handleTooltipClick}
        className={clsx(
          "btn btn-sm btn-ghost btn-square",
          isClicked && "btn-disabled"
        )}
      >
        {isClicked ? <CopiedIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}
