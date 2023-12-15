import { Dispatch, RefObject, SetStateAction } from "react";

export interface Location {
  name: string;
  id: string;
  place_type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface onPlaceSelectProps {
  coordinates: Coordinates;
  name: string;
  place_id: string;
}

export const MODES = {
  MOVE: 0,
  SET_MARKER: 1,
} as const;

export type ModeType = (typeof MODES)[keyof typeof MODES];

export interface Location {
  name: string;
  id: string;
  place_type: string;
  coordinates: Coordinates;
}

export interface MapComponentProps {
  place: Coordinates;
}

export interface MapProps {
  setPlaces: Dispatch<SetStateAction<Location[]>>;
  setMarkers: Dispatch<SetStateAction<Location[]>>;
  mapRef: RefObject<google.maps.Map | null>;
  center: Location | undefined;
  places: Location[];
  browserLocation?: Location | null;
  browserLocationActive?: boolean;
  markers: Location[];
  mode: ModeType;
}
