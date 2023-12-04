import { Marker } from "@react-google-maps/api";

export function CurrentLocationMarker({ position }) {
  return <Marker position={position} />;
}
