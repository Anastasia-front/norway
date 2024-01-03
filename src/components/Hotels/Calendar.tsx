import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ selectedDate, onSelectDate }: Props) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  const generateCalendar = (year: number, month: number): string[][] => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const days: string[][] = [[]];

    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
      days[i] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          days[i][j] = "";
        } else if (currentDay <= lastDay) {
          days[i][j] = currentDay.toString();
          currentDay++;
        } else {
          days[i][j] = "";
        }
      }
    }

    return days;
  };

  const handleDateClick = (date: number): void => {
    const newDate = new Date(currentYear, currentMonth, date);
    onSelectDate(newDate);
  };

  const handleMonthChange = (newMonth: number): void => {
    setCurrentMonth(newMonth);
  };

  const handleYearChange = (newYear: number): void => {
    setCurrentYear(newYear);
  };

  const renderCalendarHeader = (): JSX.Element => (
    <div className="calendar-header">
      <div className="calendar-header__period month">
        <button onClick={() => handleMonthChange(currentMonth - 1)}>
          <FaAngleLeft />
        </button>
        <span>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
        </span>
        <button onClick={() => handleMonthChange(currentMonth + 1)}>
          <FaAngleRight />
        </button>
      </div>
      <div className="calendar-header__period">
        <button onClick={() => handleYearChange(currentYear - 1)}>
          <FaAngleLeft />
        </button>
        <span>{currentYear}</span>
        <button onClick={() => handleYearChange(currentYear + 1)}>
          <FaAngleRight />
        </button>
      </div>
    </div>
  );

  const renderCalendarBody = (): JSX.Element => {
    const calendarGrid = generateCalendar(currentYear, currentMonth);

    return (
      <table>
        <thead>
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendarGrid.map((week, rowIndex) => (
            <tr key={rowIndex}>
              {week.map((day, colIndex) => (
                <td key={colIndex} onClick={() => handleDateClick(Number(day))}>
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="calendar">
      {renderCalendarHeader()}
      {renderCalendarBody()}
    </div>
  );
}
