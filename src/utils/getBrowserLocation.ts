import { fetchAddressFromCoordinates } from ".";
import { currentLocationCoordinates } from "../components";

export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          const currentLocation = await fetchAddressFromCoordinates(lat, lng);
          resolve(currentLocation);
        },
        () => {
          reject(currentLocationCoordinates);
        }
      );
    } else {
      reject(currentLocationCoordinates);
    }
  });
}
