import { GoogleMap, Marker } from "@react-google-maps/api";
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
  selectedPlace,
  browserLocation,
  browserLocationActive,
  markers,
  mode,
  setPlaces,
  setMarkers,
}: MapProps) {
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    if (mapRef?.current) {
      // Create a copy of markers and include the center marker if available
      const allMarkers = [...markers];

      if (center) {
        allMarkers.push(center);
      }

      // Calculate bounds based on all markers
      const bounds = new google.maps.LatLngBounds();
      allMarkers.forEach((marker) => {
        if (marker) {
          bounds.extend(
            new google.maps.LatLng(
              marker.coordinates.lat,
              marker.coordinates.lng
            )
          );
        }
      });

      // Set map center and zoom based on bounds
      if (
        (firstRender.current || allMarkers.length === 1) &&
        !browserLocationActive
      ) {
        // For the first render or if there's only one marker (excluding browserLocation), set the center without zooming
        if (center) mapRef.current.setCenter(center.coordinates);
        mapRef.current.setZoom(7);
        firstRender.current = false;
      } else {
        // After the first render, fit the bounds and set a minimum zoom level
        mapRef.current.fitBounds(bounds);
        const minZoom = 3;
        const zoom = mapRef.current.getZoom() ?? 0;
        mapRef.current.setZoom(Math.min(zoom, minZoom));

        if (selectedPlace) {
          mapRef.current.setCenter(selectedPlace.coordinates);
          mapRef.current.setZoom(10);
        }
        if (selectedPlace === null) {
          mapRef.current.fitBounds(bounds);
          const minZoom = 5;
          const zoom = mapRef.current.getZoom() ?? 0;
          mapRef.current.setZoom(Math.min(zoom, minZoom));
        }
      }
    }
  }, [markers, center, places, browserLocationActive, selectedPlace]);

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
          const place = await fetchAddressFromCoordinates(lat, lng);
          setMarkers([...markers, place]);
          setPlaces([...places, place]);
        } catch (error) {
          console.error("Error during geocoding:", error);
        }
      }
    },
    [mode, markers]
  );

  return center ? (
    <div className="containerMap">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center.coordinates}
        zoom={10}
        onLoad={onLoad}
        onClick={onClick}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {shouldRenderMarker && <Marker position={center.coordinates} />}
        {markers.map((marker) => {
          return (
            <LocationMarker key={marker.id} position={marker.coordinates} />
          );
        })}
        {browserLocation && browserLocationActive && (
          <BrowserLocationMarker position={browserLocation.coordinates} />
        )}
      </GoogleMap>
    </div>
  ) : null;
}
