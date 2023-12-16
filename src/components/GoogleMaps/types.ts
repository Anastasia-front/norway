import { Dispatch, SetStateAction } from "react";

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
  center: Location | undefined;
  places: Location[];
  selectedPlace: Location | null;
  browserLocation?: Location | null;
  browserLocationActive?: boolean;
  markers: Location[];
  mode: ModeType;
}

export interface AutocompleteProps {
  isLoaded: boolean;
  onSelect: ({ coordinates, name, place_id }: onPlaceSelectProps) => void;
}

export interface Place {
  description: string;
}

export interface PlaceListProps {
   places: Location[];
   browserLocation: Location;
   onPlacesRemove: (place_id: string) => void;
   onFindPlace: (place_id: string|null) => void;
 }
