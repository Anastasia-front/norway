import { useJsApiLoader } from "@react-google-maps/api";
import React, { useCallback, useState } from "react";
import { Autocomplete } from "./Autocomplete";
import { MODES, Map } from "./Map";
import { PlacesList } from "./PlacesList";

import { SidebarWrapper } from "./SidebarWrapper";

// const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_API_KEY;

const API_KEY = "AIzaSyC6dezXKHPGErarv7uoLG_FyQXB3taQYz0";

const defaultCenter = {
  lat: 48.22,
  lng: 31.1,
};

export function MapComponent() {
  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState(MODES.MOVE);
  const [sidebarOpened, setSidebarOpened] = useState(true);
  const [places, setPlaces] = useState([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY || "",
    libraries: ["places"],
  });

  const onPlaceSelect = React.useCallback(
    ({ coordinates, name, place_id }) => {
      setCenter(coordinates);
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
      };
      setMarkers([...markers, coordinates]);
      setPlaces([...places, place]);
    },
    [places, markers]
  );

  const clear = React.useCallback(() => {
    setMarkers([]);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpened(!sidebarOpened);
  }, [sidebarOpened]);

  const handlePlacesRemove = useCallback(
    (placeId) => {
      const filteredPlaces = places.filter((place) => place.id !== placeId);
      setPlaces(filteredPlaces);
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

  const onMarkerAdd = React.useCallback(
    (coordinates) => {
      setMarkers([...markers, coordinates]);
    },
    [markers]
  );

  return (
    <div>
      <SidebarWrapper
        className="addressSearchContainer}"
        isOpened={sidebarOpened}
      >
        <div className="autocompleteWrapper">
          <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
          <button className="modeToggle" onClick={toggleMode}>
            Set markers
          </button>
          <button className="modeToggle" onClick={clear}>
            Clear
          </button>
        </div>
        <PlacesList places={places} onPlacesRemove={handlePlacesRemove} />
      </SidebarWrapper>
      <button className="collapseButton" onClick={toggleSidebar}>
        {sidebarOpened ? "Collapse" : "Expand"}
      </button>
      {isLoaded ? (
        <Map
          places={places}
          center={center}
          markers={markers}
          onMarkerAdd={onMarkerAdd}
        />
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}
