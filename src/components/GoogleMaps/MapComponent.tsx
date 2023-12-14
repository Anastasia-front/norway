import { useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";

import {
  Autocomplete,
  Coordinates,
  Location,
  MODES,
  Map,
  MapComponentProps,
  ModeType,
  PlacesList,
  onPlaceSelectProps,
} from ".";

import { fetchAddressFromCoordinates, getBrowserLocation } from "../../utils";

// const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

const API_KEY = "AIzaSyC6dezXKHPGErarv7uoLG_FyQXB3taQYz0";

export function MapComponent({ place }: MapComponentProps) {
  const [center, _] = useState<Coordinates>(place);
  const [markers, setMarkers] = useState<Coordinates[]>([]);
  const [mode, setMode] = useState<ModeType>(MODES.MOVE);
  const [listOpened, setListOpened] = useState(false);
  const [browserLocation, setBrowserLocation] = useState();
  const [places, setPlaces] = useState<Location[]>([]);
  let currentLocation: Location;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lng } = place;
        currentLocation = await fetchAddressFromCoordinates(lat, lng);
        setPlaces([currentLocation]);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchData();
  }, [place]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY || "",
    libraries: ["places"],
  });

  const onPlaceSelect = React.useCallback(
    ({ coordinates, name, place_id }: onPlaceSelectProps) => {
      // todo make a new component which will hold 4 buttons (add as final dest., add as waypoint, add as starting point, cancel)
      // todo when user clicks on place from autocomplete, show component instead of places list

      // todo if user clicks cancel - show list instead of buttons, don't add city/place to places state variable
      // todo if user clicks add as final destination - update places array with new city/place value
      // todo if user clicks add as origin - update places array with new city/place value
      // todo if user clicks add as waypoint - update places array with new city/place value

      const place = {
        name,
        id: place_id,
        place_type: "destination/waypoint/origin",
        coordinates,
      };

      setPlaces([...places, place]);
      setMarkers([...markers, coordinates]);
    },
    [places, markers]
  );

  const clear = React.useCallback(() => {
    setMarkers([]);
    setPlaces([currentLocation]);
  }, []);

  const toggleListVisibility = useCallback(() => {
    setListOpened(!listOpened);
  }, [listOpened]);

  const handlePlacesRemove = useCallback(
    (coordinates: Coordinates, place_id: string) => {
      const filteredPlaces = places.filter((place) => place.id !== place_id);
      setPlaces(filteredPlaces);

      const filteredMarkers = markers.filter(
        (marker) => marker !== coordinates
      );
      setMarkers(filteredMarkers);
    },
    [places, markers]
  );

  const toggleMode = React.useCallback(() => {
    switch (mode) {
      case MODES.MOVE:
        setMode(MODES.SET_MARKER);
        break;

      case MODES.SET_MARKER:
        setMode(MODES.MOVE);
        break;

      default:
        setMode(MODES.MOVE);
        break;
    }
    console.log(mode);
  }, [mode]);

  const handleBrowserLocation = () => {
    getBrowserLocation()
      .then((currentLocation: any) => {
        setBrowserLocation(currentLocation);
      })
      .catch((place) => {
        setBrowserLocation(place);
      });
  };

  return (
    <div className="map-content">
      <div className="autocompleteWrapper addressSearchContainer">
        <button
          type="button"
          className={`modeToggle ${listOpened ? "modeToggle-marker" : ""}`}
          onClick={toggleListVisibility}
        >
          List of places
        </button>
        {listOpened && (
          <PlacesList places={places} onPlacesRemove={handlePlacesRemove} />
        )}
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        <button
          type="button"
          className={`modeToggle ${mode === 1 ? "modeToggle-marker" : ""}`}
          onClick={toggleMode}
        >
          Set markers
        </button>
        <button type="button" className="modeToggle" onClick={clear}>
          Clear
        </button>
        <button
          type="button"
          className="modeToggle"
          onClick={handleBrowserLocation}
        >
          Browser location
        </button>
      </div>

      {isLoaded ? (
        <Map
          places={places}
          setPlaces={setPlaces}
          setMarkers={setMarkers}
          // setCenter={setCenter}
          center={center}
          markers={markers}
          mode={mode}
          browserLocation={browserLocation}
        />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
