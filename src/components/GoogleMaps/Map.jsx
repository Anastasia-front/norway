import {
  // DirectionsRenderer,
  // DirectionsService,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

import { LocationMarker } from ".";

import { defaultTheme } from "./theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  clickableIcons: true,
  keyboardShortcuts: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: true,
  styles: defaultTheme,
};

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
};

const Map = ({ center, places, markers, mode, onMarkerAdd }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [directionsServiceOption, setDirectionsServiceOption] = useState({});
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShouldRenderMarker(true);
    }, 1000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [center]);

  const mapRef = useRef(undefined);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    (loc) => {
      if (mode === MODES.SET_MARKER) {
        const lat = loc.latLng.lat();
        const lng = loc.latLng.lng();

        onMarkerAdd({ lat, lng });
      }
    },
    [mode, onMarkerAdd]
  );

  let count = useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 2) {
      if (res.status === "OK") {
        count.current += 1;
        setDirectionsResponse(res);
      } else {
        count.current = 0;
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

  return center ? (
    <div className="containerMap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onClick={onClick}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {shouldRenderMarker && <Marker position={center} />}{" "}
        {markers.map((marker) => {
          return <LocationMarker key={marker} position={marker} />;
        })}
      </GoogleMap>
    </div>
  ) : null;
};

// return (
//   <div className="containerMap">
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onClick={onClick}
//       onUnmount={onUnmount}
//       options={defaultOptions}
//     >
//       <Marker position={center} />
//       {markers.map((marker) => {
//         return <LocationMarker key={marker} position={marker} />;
//       })}
//       {/* {directionsResponse !== null && (
//         <DirectionsRenderer
//           options={{
//             directions: directionsResponse,
//           }}
//         />
//       )}
//       <DirectionsService
//         options={directionsServiceOption}
//         callback={directionsCallback}
//       /> */}
//     </GoogleMap>
//   </div>
// );
// };

export { Map };
