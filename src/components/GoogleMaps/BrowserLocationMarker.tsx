import { Marker } from "@react-google-maps/api";

interface Props {
  position: { lat: number; lng: number };
}

export function BrowserLocationMarker({ position }: Props) {
  return <Marker position={position} icon={{ url: "/location-violet.svg" }} />;
}
