import { currentLocationCoordinates } from "../components";

export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          resolve({ lat, lng });
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
