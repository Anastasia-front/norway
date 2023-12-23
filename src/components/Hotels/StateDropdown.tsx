import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Loader } from "..";

interface State {
  name: string;
}

interface Props {
  selectedState: string;
  onSelectState: (state: string) => void;
}

export function StateDropdown({ selectedState, onSelectState }: Props) {
  const [states, setStates] = useState<State[]>([]);
  const [selectedStateOnChange, setSelectedStateOnChange] =
    useState(selectedState);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchStates = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            country: "norway",
          }
        );

        const stateResults = response.data.data.states.map((result: any) => ({
          name: result.name,
        }));

        setStates(stateResults);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching states", error);
        setIsLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleChange = (state: string) => {
    onSelectState(state);
    setSelectedStateOnChange(state);
  };

  return (
    <div className="input-dropdown__list">
      <span>
        Selected state is - <b>{selectedStateOnChange}</b>
      </span>
      {isLoading ? (
        <Loader />
      ) : (
        <ul ref={dropdownRef}>
          {states.map((state, index) => (
            <li key={index} onClick={() => handleChange(state.name)}>
              {state.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
