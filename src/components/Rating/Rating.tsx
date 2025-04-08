import type { FC } from "react";
import StarIcon from "@/src/icons/StarIcon";

interface RatingProps {
  rate: number;
}

const Rating: FC<RatingProps> = ({ rate }) => {
  const backgroundColor =
    rate <= 5
      ? "#C82020"
      : rate <= 7
        ? "#777777"
        : rate <= 8.5
          ? "#308E21"
          : "#A59400";

  return (
    <div className="rating" style={{ backgroundColor: backgroundColor }}>
      <StarIcon className="rating__icon" />
      <span className="rating__text">{rate.toFixed(1)}</span>
    </div>
  );
};

export default Rating;
