import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Loader } from "..";

interface City {
  city: string;
}

interface Props {
  selectedState: string;
  selectedLocation: string;
  onSelectCity: (city: string) => void;
}

export function CityDropdown({
  selectedLocation,
  selectedState,
  onSelectCity,
}: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState(selectedLocation);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            country: "norway",
            state: selectedState,
          }
        );

        const cities: City[] = response.data.data.map((city: string) => ({
          city,
        }));

        setCities(cities);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching cities", error);
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (city: string) => {
    onSelectCity(city);
    setSelectedCity(city);
  };

  return (
    <div className="input-dropdown__list">
      <span>
        Selected city is - <b>{selectedCity}</b>
      </span>
      {isLoading ? (
        <Loader />
      ) : cities.length === 0 ? (
        <p>There is no one city in this state</p>
      ) : (
        <ul ref={dropdownRef}>
          {cities.map((city, index) => (
            <li key={index} onClick={() => handleChange(city.city)}>
              {city.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
