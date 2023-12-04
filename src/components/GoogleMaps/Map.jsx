import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

import { CurrentLocationMarker, Marker } from ".";

import { defaultTheme } from "./theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const Map = ({ center, places, markers }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [directionsServiceOption, setDirectionsServiceOption] = useState({});

  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  let count = useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 2) {
      if (res.status === "OK") {
        count.current += 1;
        setDirectionsResponse(res);
      } else {
        count.current = 0;
        console.log("res: ", res);
      }
    }
  };

  useEffect(() => {
    if (places.length === 1) {
      // means it is the origin
      setDirectionsServiceOption({
        travelMode: "DRIVING",
        origin: places[0].name,
      });
    } else if (places.length >= 2) {
      const waypoints = places
        .filter((place) => place.place_type === "waypoint")
        .map((place) => ({
          location: place.name,
          stopover: true,
        }));
      setDirectionsServiceOption({
        travelMode: "DRIVING",
        origin: places.find((place) => place.place_type === "origin"),
        destination: places.find((place) => place.place_type === "destination"),
        waypoints,
      });
    }
  }, [places]);

  return (
    <div className="containerMap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {directionsResponse !== null && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
        <CurrentLocationMarker position={center} />
        {markers.map((marker) => {
          return <Marker key={marker} position={marker} />;
        })}
        <DirectionsService
          options={directionsServiceOption}
          callback={directionsCallback}
        />
      </GoogleMap>
    </div>
  );
};

export { Map };
