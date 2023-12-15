import { IoTrashBin } from "react-icons/io5";
import { Location } from ".";

interface Props {
  places: Location[];
  browserLocation: Location;
  onPlacesRemove: (place_id: string) => void;
  onFindPlace: (place_id: string) => void;
}

export const PlacesList = ({
  places,
  browserLocation,
  onPlacesRemove,
  onFindPlace,
}: Props) => {
  return (
    <ul className="place-list">
      {places.length === 1 ? (
        <p>{`Your selected place is ${places[0].name}`}</p>
      ) : (
        places.map((place, index) => {
          if (index === 0) {
            return (
              <li key={place.id} className="place-item">
                <button
                  type="button"
                  className="button-place"
                  onClick={()=>onFindPlace(place.id)}
                >
                  {place.name}
                </button>
                <b>selected place</b>
              </li>
            );
          }
          if (place.id === browserLocation.id) {
            return (
              <li key={place.id} className="place-item">
                <button
                  type="button"
                  className="button-place"
                  onClick={()=>onFindPlace(place.id)}
                >
                  {place.name}
                </button>
                <b>browser location</b>
              </li>
            );
          } else {
            return (
              <li key={place.id} className="place-item">
                <button
                  type="button"
                  className="button-place"
                  onClick={()=>onFindPlace(place.id)}
                >
                  {place.name}
                </button>
                <button
                  className="button-remove"
                  onClick={() => {
                    onPlacesRemove(place.id);
                  }}
                >
                  Remove <IoTrashBin />
                </button>
              </li>
            );
          }
        })
      )}
    </ul>
  );
};

PlacesList.defaultProps = {
  places: [],
  onPlacesRemove: () => {},
};
