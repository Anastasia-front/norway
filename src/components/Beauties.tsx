import { useState } from "react";

import useOnclickOutside from "react-cool-onclickoutside";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import {
  CityDropdown,
  Loader,
  Rating,
  StateDropdown,
  Subtitle,
  Title,
} from ".";

import { formateDate } from "../helpers";

import h1 from "../assets/content/beauties/bergen.webp";
import h2 from "../assets/content/beauties/norway.webp";
import h3 from "../assets/content/beauties/reine.webp";

import { getAltNameFromPath } from "../helpers";

import { Calendar } from ".";

const hotels = [
  { name: h1, price: 720, stars: 4 },
  { name: h2, price: 550, stars: 5 },
  { name: h3, price: 670, stars: 3.5 },
];

export function Beauties() {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isCityDropdownVisible, setCityDropdownVisible] = useState(false);
  const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedLocation] = useState("Bergen");
  const [selectedState, setSelectedState] = useState("Nordland");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Sorry, but we did not find any hotels or apartments");
    }, 2000);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  const openCalendar = () => {
    setCalendarVisible(true);
  };

  const closeCalendar = () => {
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const refCalendar = useOnclickOutside(() => {
    closeCalendar();
  });

  const handleCityChange = (location: string) => {
    setSelectedLocation(location);
    setCityDropdownVisible(false);
  };

  const openCityDropdown = () => {
    setCityDropdownVisible(true);
  };

  const closeCityDropdown = () => {
    setCityDropdownVisible(false);
  };

  const toggleCityDropdown = () => {
    setCityDropdownVisible(!isCityDropdownVisible);
  };

  const refCity = useOnclickOutside(() => {
    closeCityDropdown();
  });

  const handleStateChange = (place: string) => {
    setSelectedState(place);
    setStateDropdownVisible(false);
  };

  const openStateDropdown = () => {
    setStateDropdownVisible(true);
  };

  const closeStateDropdown = () => {
    setStateDropdownVisible(false);
  };

  const toggleStateDropdown = () => {
    setStateDropdownVisible(!isStateDropdownVisible);
  };

  const refState = useOnclickOutside(() => {
    closeStateDropdown();
  });
  return (
    <section id="Beauties">
      <Subtitle name="Beauties" /> <Title name="Hotels and Apartments" />
      <ul className="hotel-list container">
        {hotels.map((hotel) => (
          <li key={getAltNameFromPath(hotel.name)} className="hotel-container">
            <img
              src={hotel.name}
              alt={getAltNameFromPath(hotel.name)}
              className="hotel-img"
            />
            <div className="hotel-info">
              <p>
                {getAltNameFromPath(hotel.name)}
                <span> ${hotel.price} </span>
              </p>
              <Rating defaultRating={hotel.stars} />
            </div>
          </li>
        ))}
      </ul>
      <div className="search-bg">
        <div className="search container">
          <div className="input-dropdown" ref={refCalendar}>
            <label htmlFor="date" className="label">
              Date
            </label>
            <input
              type="text"
              className="input-input"
              id="date"
              placeholder="Select date"
              onFocus={openCalendar}
              value={formateDate(selectedDate)}
              readOnly
            />
            <div className="input-icon" onClick={toggleCalendar}>
              {isCalendarVisible ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isCalendarVisible && (
              <Calendar
                selectedDate={selectedDate}
                onSelectDate={handleDateChange}
              />
            )}
          </div>
          <div className="input-dropdown" ref={refState}>
            <label htmlFor="place" className="label">
              State
            </label>
            <input
              type="text"
              className="input-input"
              id="place"
              placeholder="Select place"
              onFocus={openStateDropdown}
              value={selectedState}
              readOnly
            />
            <div className="input-icon" onClick={toggleStateDropdown}>
              {isStateDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isStateDropdownVisible && (
              <StateDropdown
                selectedState={selectedState}
                onSelectState={handleStateChange}
              />
            )}
          </div>
          <div className="input-dropdown" ref={refCity}>
            <label htmlFor="location" className="label">
              City
            </label>
            <input
              type="text"
              className="input-input"
              id="location"
              placeholder="Select location"
              onFocus={openCityDropdown}
              value={selectedCity}
              readOnly
            />
            <div className="input-icon" onClick={toggleCityDropdown}>
              {isCityDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isCityDropdownVisible && (
              <CityDropdown
                selectedState={selectedState}
                selectedLocation={selectedCity}
                onSelectCity={handleCityChange}
              />
            )}
          </div>
          <button
            type="button"
            className={`search-button ${isLoading ? "not-allowed" : ""}`}
            onClick={handleButtonClick}
          >
            {isLoading ? <Loader /> : "SEARCH"}
          </button>
        </div>
      </div>
    </section>
  );
}
