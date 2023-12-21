import { useRef, useState } from "react";

import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

import { Subtitle, Title } from ".";

import a7 from "../assets/jpg/content/activities//mountains.jpg";
import a1 from "../assets/jpg/content/activities/bays.jpg";
import a3 from "../assets/jpg/content/activities/coasts.jpg";
import a2 from "../assets/jpg/content/activities/fjords.jpg";
import a4 from "../assets/jpg/content/activities/hiking.jpg";
import a5 from "../assets/jpg/content/activities/kayaking.jpg";
import a6 from "../assets/jpg/content/activities/local-settlements.jpg";
import a8 from "../assets/jpg/content/activities/northern-lights.jpg";
import a9 from "../assets/jpg/content/activities/sailing.jpg";
import a10 from "../assets/jpg/content/activities/skiing.jpg";
import { getAltNameFromPath } from "../helpers";
import { useScreenQuery } from "../hooks";

const activities = [
  { img: a1, number: 424 },
  { img: a2, number: 868 },
  { img: a3, number: 367 },
  { img: a7, number: 254 },
  { img: a4, number: 998 },
  { img: a5, number: 234 },
  { img: a6, number: 657 },
  { img: a8, number: 734 },
  { img: a9, number: 345 },
  { img: a10, number: 767 },
];
export function Activities() {
  const { isScreenMobileLg, isScreenTabletSm, isScreenTabletLg } =
    useScreenQuery();

  const slidesRef = useRef<HTMLUListElement | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const visibleSlides = isScreenTabletLg
    ? 4
    : isScreenTabletSm
    ? 3
    : isScreenMobileLg
    ? 2
    : 1;

  function showSlide(direction: "next" | "prev"): void {
    const totalSlides = activities.length;

    let newStartIndex = startIndex;

    if (direction === "next" && newStartIndex + visibleSlides < totalSlides) {
      newStartIndex++;
    } else if (direction === "prev" && newStartIndex > 0) {
      newStartIndex--;
    }

    setStartIndex(newStartIndex);

    const translateValue: string = `translateX(${
      -newStartIndex * (100 / visibleSlides)
    }%)`;
    if (slidesRef.current) {
      slidesRef.current.style.transform = translateValue;
    }
  }

  const isPrevButtonDisabled = startIndex === 0;
  const isNextButtonDisabled = startIndex + visibleSlides >= activities.length;

  return (
    <section id="Activities" className="container">
      <Subtitle name="HUNDREDS OF" />
      <Title name="Activities for Everyone" />
      <div className="slider-container">
        <button
          className="slider-button slider-button__prev"
          onClick={() => showSlide("prev")}
          disabled={isPrevButtonDisabled}
        >
          <LuMoveLeft />
          Prev
        </button>
        <ul className="slider-content">
          {activities
            .slice(startIndex, startIndex + visibleSlides)
            .map((activity) => (
              <li key={getAltNameFromPath(activity.img)}>
                <img
                  src={activity.img}
                  alt={getAltNameFromPath(activity.img)}
                />
                <p>{getAltNameFromPath(activity.img)}</p>
                <span>{activity.number} activities</span>
              </li>
            ))}
        </ul>
        <button
          className="slider-button slider-button__next"
          onClick={() => showSlide("next")}
          disabled={isNextButtonDisabled}
        >
          <LuMoveRight />
          Next
        </button>
      </div>
    </section>
  );
}
