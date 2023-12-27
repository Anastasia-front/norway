import { useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import {
  Autocomplete,
  Location,
  MODES,
  Map,
  MapComponentProps,
  ModeType,
  PlacesList,
  onPlaceSelectProps,
} from ".";
import { Loader } from "..";
import { fetchAddressFromCoordinates, getBrowserLocation } from "../../utils";

// const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

const API_KEY = "AIzaSyC6dezXKHPGErarv7uoLG_FyQXB3taQYz0";

export function MapComponent({ place }: MapComponentProps) {
  const [center, setCenter] = useState<Location>();
  const [markers, setMarkers] = useState<Location[]>([]);
  const [mode, setMode] = useState<ModeType>(MODES.MOVE);
  const [listOpened, setListOpened] = useState(false);
  const [browserLocation, setBrowserLocation] = useState({
    name: "hfg",
    id: "khg",
    place_type: "hgc",
    coordinates: { lat: 56, lng: 75 },
  });
  const [browserLocationActive, setBrowserLocationActive] = useState(false);
  const [browserLocationLoading, setBrowserLocationLoading] = useState(false);
  const [places, setPlaces] = useState<Location[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Location | null>(null);
  let currentLocation: Location;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { lat, lng } = place;
        currentLocation = await fetchAddressFromCoordinates(lat, lng);
        setPlaces([currentLocation]);
        setCenter(currentLocation || {});
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
      setMarkers([...markers, place]);
    },
    [places, markers]
  );

  const clear = React.useCallback(() => {
    setMarkers([]);
    setPlaces([currentLocation]);
    setBrowserLocationActive(false);
  }, []);

  const toggleListVisibility = useCallback(() => {
    setListOpened(!listOpened);
  }, [listOpened]);

  const handlePlacesRemove = useCallback(
    (place_id: string) => {
      const filteredPlaces = places.filter((place) => place.id !== place_id);
      setPlaces(filteredPlaces);

      const filteredMarkers = markers.filter(
        (marker) => marker.id !== place_id
      );
      setMarkers(filteredMarkers);
    },
    [places, markers]
  );

  const handleFindPlace = useCallback(
    (place_id: string | null) => {
      const selectedPlace = places.find((place) => place.id === place_id);

      // If the place is found, set the map center to its coordinates
      if (selectedPlace) {
        setSelectedPlace(selectedPlace);
      } else {
        setSelectedPlace(null);
      }
    },
    [places]
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
  }, [mode]);

  const handleBrowserLocation = () => {
    if (browserLocationActive) {
      setBrowserLocationActive(false);
      const filteredPlaces = places.filter(
        (place) => place.id !== browserLocation.id
      );
      setPlaces(filteredPlaces);
    } else {
      setBrowserLocationLoading(true);
      getBrowserLocation()
        .then((currentLocation: any) => {
          setBrowserLocationActive(true);
          setBrowserLocation(currentLocation);
          setPlaces([...places, currentLocation]);
          setBrowserLocationLoading(false);
        })
        .catch((place) => {
          setBrowserLocation(place);
          setBrowserLocationLoading(false);
        });
    }
  };

  const useScreen = () => useMediaQuery({ minWidth: 0, maxWidth: 759 });

  return (
    <div className="map-content">
      {useScreen() ? (
        <>
          <div className="autocompleteWrapper addressSearchContainer">
            <button
              type="button"
              className={`modeToggle ${listOpened ? "modeToggle-marker" : ""}`}
              onClick={toggleListVisibility}
            >
              List of places
            </button>
            {listOpened && (
              <PlacesList
                places={places}
                browserLocation={browserLocation}
                onPlacesRemove={handlePlacesRemove}
                onFindPlace={handleFindPlace}
              />
            )}
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
              className={`modeToggle ${
                browserLocation && browserLocationActive
                  ? "modeToggle-marker"
                  : ""
              } ${browserLocationLoading ? "not-allowed" : ""}`}
              onClick={handleBrowserLocation}
            >
              {browserLocationLoading ? <Loader /> : "Browser location"}
            </button>
          </div>
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
        </>
      ) : (
        <div className="autocompleteWrapper addressSearchContainer">
          <button
            type="button"
            className={`modeToggle ${listOpened ? "modeToggle-marker" : ""}`}
            onClick={toggleListVisibility}
          >
            List of places
          </button>
          {listOpened && (
            <PlacesList
              places={places}
              browserLocation={browserLocation}
              onPlacesRemove={handlePlacesRemove}
              onFindPlace={handleFindPlace}
            />
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
            className={`modeToggle ${
              browserLocation && browserLocationActive
                ? "modeToggle-marker"
                : ""
            } ${browserLocationLoading ? "not-allowed" : ""}`}
            onClick={handleBrowserLocation}
          >
            {browserLocationLoading ? <Loader /> : "Browser location"}
          </button>
        </div>
      )}

      {isLoaded ? (
        <Map
          places={places}
          selectedPlace={selectedPlace}
          setPlaces={setPlaces}
          setMarkers={setMarkers}
          center={center}
          markers={markers}
          mode={mode}
          browserLocation={browserLocation}
          browserLocationActive={browserLocationActive}
        />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
