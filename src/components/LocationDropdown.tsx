import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Loader } from ".";

interface City {
  city: string;
}

interface Props {
  selectedLocation: string;
  onSelectCity: (city: string) => void;
}

export function LocationDropdown({ selectedLocation, onSelectCity }: Props) {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState(selectedLocation);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            country: "norway",
          }
        );

        const cityOptions: City[] = response.data.data.map((city: string) => ({
          city,
        }));

        setCities(cityOptions);
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
