import { FaStar } from "react-icons/fa";

interface Props {
  defaultRating: number;
}

export function Rating({ defaultRating }: Props) {
  return (
    <ul className="stars">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <li key={index}>
            <FaStar
              className="star"
              color={ratingValue <= defaultRating ? "orange" : "grey"}
            />
          </li>
        );
      })}
    </ul>
  );
}
