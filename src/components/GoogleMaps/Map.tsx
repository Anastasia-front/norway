import {
  DirectionsRenderer,
  DirectionsService,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useEffect, useRef, useState } from "react";

import { BrowserLocationMarker, LocationMarker, MODES, MapProps } from ".";

import { defaultTheme } from "./theme";

import { fetchAddressFromCoordinates } from "../../utils";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  clickableIcons: true,
  keyboardShortcuts: true,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: true,
  styles: defaultTheme,
};

export function Map({
  center,
  places,
  browserLocation,
  markers,
  mode,
  setPlaces,
  setMarkers,
}: MapProps) {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [directionsServiceOption, setDirectionsServiceOption] = useState({});
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    if (mapRef.current) {
      const allMarkers = [...markers, center];

      if (allMarkers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        allMarkers.forEach((marker) => {
          bounds.extend(new google.maps.LatLng(marker.lat, marker.lng));
        });

        if (firstRender.current || allMarkers.length === 1) {
          // For the first render or if there's only one marker, set the center without zooming
          mapRef.current.setCenter(center);
          firstRender.current = false;
        } else {
          // After the first render, fit the bounds and set a minimum zoom level
          mapRef.current.fitBounds(bounds);
          const minZoom = 3;
          const zoom = mapRef.current.getZoom() ?? 0;
          mapRef.current.setZoom(Math.max(zoom, minZoom));
        }
      } else {
        // No markers, set the map back to the default position
        mapRef.current.setCenter(center);
        mapRef.current.setZoom(7);
        firstRender.current = true;
      }
    }
  }, [markers, center, places]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShouldRenderMarker(true);
    }, 1000);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [center]);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const onClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (mode === MODES.SET_MARKER) {
        const lat = e.latLng?.lat() || 0;
        const lng = e.latLng?.lng() || 0;

        try {
          // const response = await fetch(
          //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC6dezXKHPGErarv7uoLG_FyQXB3taQYz0`
          // );

          // if (!response.ok) {
          //   throw new Error("Failed to fetch address");
          // }

          // const data = await response.json();

          // if (data.status === "OK") {
          //   // Extract city and country from the response
          //   const res = data.results[0] || [];
          //   const coordinates = res.geometry.location;
          //   const place = {
          //     name: res.formatted_address,
          //     id: res.place_id,
          //     place_type: res.types[0],
          //     coordinates: res.geometry.location,
          //   };
          const place = await fetchAddressFromCoordinates(lat, lng);
          const coordinates = { lat, lng };
          setMarkers([...markers, coordinates]);
          setPlaces([...places, place]);
          // } else {
          //   console.error("Geocoding failed with status:", data.status);
          // }
        } catch (error) {
          console.error("Error during geocoding:", error);
        }
      }
    },
    [mode, markers]
  );

  let count = useRef(0);
  const directionsCallback = (res) => {
    console.log(res);
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
    if (places) {
      if (places.length === 1) {
        // means it is the origin
        setDirectionsServiceOption({
          travelMode: "DRIVING",
          origin: `${places[0].coordinates.lat},${places[0].coordinates.lng}`,
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
          destination: places.find(
            (place) => place.place_type === "destination"
          ),
          waypoints,
        });
      }
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
        {shouldRenderMarker && <Marker position={center} />}
        {markers.map((marker) => {
          return <LocationMarker key={marker?.lat} position={marker} />;
        })}
        {browserLocation && (
          <BrowserLocationMarker position={browserLocation} />
        )}
        {directionsResponse !== null && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
        <DirectionsService
          options={directionsServiceOption}
          callback={directionsCallback}
        />
      </GoogleMap>
    </div>
  ) : null;
}
