import {
  // DirectionsRenderer,
  // DirectionsService,
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
  browserLocationActive,
  markers,
  mode,
  mapRef,
  setPlaces,
  setMarkers,
}: MapProps) {
  // const [directionsResponse, setDirectionsResponse] = useState(null);
  // const [directionsServiceOption, setDirectionsServiceOption] = useState({});
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // const mapRef = useRef<google.maps.Map | undefined>(undefined);
  const firstRender = useRef(true);

  useEffect(() => {
    if (mapRef.current) {
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
      }
    }
  }, [markers, center, places, browserLocationActive]);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     const allMarkers = [...markers];

  //     if (center) {
  //       // If there's a separate center marker, add it to the markers
  //       allMarkers.push(center);
  //     }

  //     if (browserLocationActive && browserLocation) {
  //       const browserLocationMarker = {
  //         coordinates: browserLocation.coordinates,
  //       };
  //       // If browser location is active, include it in the calculation of bounds
  //       // but don't add it to the markers
  //       const bounds = new google.maps.LatLngBounds();
  //       allMarkers.forEach((marker) => {
  //         if (marker)
  //           bounds.extend(
  //             new google.maps.LatLng(
  //               marker.coordinates.lat,
  //               marker.coordinates.lng
  //             )
  //           );
  //       });
  //       bounds.extend(
  //         new google.maps.LatLng(
  //           browserLocationMarker.coordinates.lat,
  //           browserLocationMarker.coordinates.lng
  //         )
  //       );

  //       if (
  //         !browserLocationActive &&
  //         (firstRender.current || allMarkers.length === 1)
  //       ) {
  //         // For the first render or if there's only one marker (excluding browserLocation), set the center without zooming
  //         if (center) mapRef.current.setCenter(center.coordinates);
  //         firstRender.current = false;
  //       } else {
  //         // After the first render, fit the bounds and set a minimum zoom level
  //         mapRef.current.fitBounds(bounds);
  //         const minZoom = 3;
  //         const zoom = mapRef.current.getZoom() ?? 0;
  //         mapRef.current.setZoom(Math.max(zoom, minZoom));
  //       }
  //     } else {
  //       // No markers (excluding browserLocation), set the map back to the default position
  //       if (center) mapRef.current.setCenter(center.coordinates);
  //       mapRef.current.setZoom(7);
  //       firstRender.current = true;
  //     }
  //   }
  // }, [markers, center, places, browserLocationActive, browserLocation]);

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

  // let count = useRef(0);
  // const directionsCallback = (res) => {
  //   console.log(res);
  //   if (res !== null && count.current < 2) {
  //     if (res.status === "OK") {
  //       count.current += 1;
  //       setDirectionsResponse(res);
  //     } else {
  //       count.current = 0;
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (places) {
  //     if (places.length === 1) {
  //       // means it is the origin
  //       setDirectionsServiceOption({
  //         travelMode: "DRIVING",
  //         origin: `${places[0].},${places[0].coordinates.lng}`,
  //       });
  //     } else if (places.length >= 2) {
  //       const waypoints = places
  //         .filter((place) => place.place_type === "waypoint")
  //         .map((place) => ({
  //           location: place.name,
  //           stopover: true,
  //         }));
  //       setDirectionsServiceOption({
  //         travelMode: "DRIVING",
  //         origin: places.find((place) => place.place_type === "origin"),
  //         destination: places.find(
  //           (place) => place.place_type === "destination"
  //         ),
  //         waypoints,
  //       });
  //     }
  //   }
  // }, [places]);

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
        {/* {directionsResponse !== null && (
          <DirectionsRenderer
            options={{
              directions: directionsResponse,
            }}
          />
        )}
        <DirectionsService
          options={directionsServiceOption}
          callback={directionsCallback}
        /> */}
      </GoogleMap>
    </div>
  ) : null;
}
