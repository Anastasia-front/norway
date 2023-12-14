import { IoTrashBin } from "react-icons/io5";
import { Coordinates, Location } from ".";

interface Props {
  places: Location[];

  onPlacesRemove: (coordinates: Coordinates, place_id: string) => void;
}

export const PlacesList = ({ places, onPlacesRemove }: Props) => {
  console.log(places);
  return (
    <ul className="place-list">
      {places.length === 0 ? (
        <p>{`Your selected place is ${places[0]}`}</p>
      ) : (
        places.map((place) => (
          <li key={place.id} className="place-item">
            {place.name}
            <button
              className="button-remove"
              onClick={() => {
                onPlacesRemove(place.coordinates, place.id);
              }}
            >
              Remove <IoTrashBin />
            </button>
          </li>
        ))
      )}
    </ul>
  );
};

PlacesList.defaultProps = {
  places: [],
  onPlacesRemove: () => {},
};
