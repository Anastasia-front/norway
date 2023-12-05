import { Marker } from "@react-google-maps/api";

export function LocationMarker({ position }) {
  console.log(position);
  return <Marker position={position} icon={{ url: "/location.svg" }} />;
}
