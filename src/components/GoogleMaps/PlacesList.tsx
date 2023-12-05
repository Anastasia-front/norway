interface Location {
  name: string;
  id: string;
  place_type: string;
}

interface Props {
  places: Location[];
  onPlacesRemove: (place_id: string) => void;
}

export const PlacesList = ({ places, onPlacesRemove = () => {} }: Props) => {
  return (
    <>
      {places.map((place) => (
        <div>
          {place.name}
          <button
            onClick={() => {
              onPlacesRemove(place.id);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};

PlacesList.defaultProps = {
  places: [],
  onPlacesRemove: () => {},
};
