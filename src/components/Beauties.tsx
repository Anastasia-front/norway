import { useState } from "react";

import useOnclickOutside from "react-cool-onclickoutside";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

import { Rating, Subtitle, Title } from ".";

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
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  const ref = useOnclickOutside(() => {
    toggleCalendar();
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
        <div className="input-dropdown" ref={ref}>
          <label htmlFor="datepicker" className="label">
            Date
          </label>
          <input
            type="text"
            className="input-input"
            id="datepicker"
            placeholder="Select date"
            onFocus={toggleCalendar}
            value={formateDate(selectedDate)}            readOnly
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
        <div className="input-dropdown" ref={ref}>
          <label htmlFor="datepicker" className="label">
          Location
          </label>
          <input
            type="text"
            className="input-input"
            id="datepicker"
            placeholder="Select location"
            onFocus={toggleCalendar}
            value={formateDate(selectedDate)}            readOnly
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
        <div className="input-dropdown" ref={ref}>
          <label htmlFor="datepicker" className="label">
          PLACE
          </label>
          <input
            type="text"
            className="input-input"
            id="datepicker"
            placeholder="Select place"
            onFocus={toggleCalendar}
            value={formateDate(selectedDate)}            readOnly
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
        <button type="button" className="search-button">SEARCH</button>
      </div>
      </div>

    </section>
  );
}
