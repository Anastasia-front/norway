import { Marker } from "@react-google-maps/api";

interface Props {
  position: { lat: number; lng: number };
}

export function LocationMarker({ position }: Props) {
  return <Marker position={position} icon={{ url: "/location-green.svg" }} />;
}
