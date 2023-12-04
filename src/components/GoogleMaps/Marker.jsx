import { Marker as GoogleMapMarker } from "@react-google-maps/api";


export function Marker({ position }) {
  return <GoogleMapMarker position={position} />;
}
