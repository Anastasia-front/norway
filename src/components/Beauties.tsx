import { useState } from "react";

import useOnclickOutside from "react-cool-onclickoutside";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import { CityDropdown, Rating, StateDropdown, Subtitle, Title } from ".";

import { formateDate } from "../helpers";

import h1 from "../assets/jpg/content/beauties/bergen.jpg";
import h2 from "../assets/jpg/content/beauties/norway.jpg";
import h3 from "../assets/jpg/content/beauties/reine.jpg";

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
  const [isPlaceDropdownVisible, setPlaceDropdownVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedLocation] = useState("Bergen");
  const [selectedPlace, setSelectedPlace] = useState("Nordland");

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

  const refCalendar = useOnclickOutside(() => {
    closeCalendar();
  });

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setCityDropdownVisible(false);
  };

  const openCityDropdown = () => {
    setCityDropdownVisible(true);
  };

  const closeCityDropdown = () => {
    setCityDropdownVisible(false);
  };

  const refCity = useOnclickOutside(() => {
    closeCityDropdown();
  });

  const handlePlaceChange = (place: string) => {
    setSelectedPlace(place);
    setPlaceDropdownVisible(false);
  };

  const openPlaceDropdown = () => {
    setPlaceDropdownVisible(true);
  };

  const closePlaceDropdown = () => {
    setPlaceDropdownVisible(false);
  };

  const refState = useOnclickOutside(() => {
    closePlaceDropdown();
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
            <div className="input-icon" onClick={openCalendar}>
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
              onFocus={openPlaceDropdown}
              value={selectedPlace}
              readOnly
            />
            <div className="input-icon" onClick={openPlaceDropdown}>
              {isPlaceDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isPlaceDropdownVisible && (
              <StateDropdown
                selectedState={selectedPlace}
                onSelectState={handlePlaceChange}
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
            <div className="input-icon" onClick={openCityDropdown}>
              {isCityDropdownVisible ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            {isCityDropdownVisible && (
              <CityDropdown
                selectedState={selectedPlace}
                selectedLocation={selectedCity}
                onSelectCity={handleLocationChange}
              />
            )}
          </div>
          <button type="button" className="search-button">
            SEARCH
          </button>
        </div>
      </div>
    </section>
  );
}
