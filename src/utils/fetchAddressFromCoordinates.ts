import { Location } from "../components/GoogleMaps";

export async function fetchAddressFromCoordinates(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC6dezXKHPGErarv7uoLG_FyQXB3taQYz0`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }

    const data = await response.json();

    if (data.status === "OK") {
      const res = data.results[0] || {};

      const place: Location = {
        name: res.formatted_address || "",
        id: res.place_id || "",
        place_type: res.types ? res.types[0] : "",
        coordinates: res.geometry ? res.geometry.location : null,
      };

      return place;
    } else {
      throw new Error("Failed to fetch address");
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
}
