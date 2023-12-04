import { useEffect, useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import { Link } from "react-scroll";

import { useKeyPress, useScrollLock } from "../hooks";

import { Portal } from ".";
import { MapComponent } from "./GoogleMaps/MapComponent";

const socials = ["facebook", "twitter", "youtube", "instagram", "dribble"];

const cities = ["Trondheim", "Geirangerfjord", "Harstad"];

export function Hero() {
  const amountOfBgs = 7;
  const [activeBg, setActiveBg] = useState(1);
  const [currentCity, setCurrentCity] = useState<null | string>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleClickNext = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      if (activeBg === amountOfBgs) {
        setActiveBg(1);
      } else {
        setActiveBg(activeBg + 1);
      }
    }, 300);
  };
  const handleClickPrev = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsVisible(true);
      if (activeBg === 1) {
        setActiveBg(amountOfBgs);
      } else {
        setActiveBg(activeBg - 1);
      }
    }, 300);
  };

  const handleMapToggle = () => {
    setIsMapOpen(!isMapOpen);
  };

  useKeyPress("Escape", handleMapToggle);

  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (isMapOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isMapOpen, lockScroll, unlockScroll]);

  const currentLocation = () => {
    switch (currentCity) {
      case "Trondheim":
        return "https://www.google.com/maps/place/%D0%A2%D1%80%D0%BE%D0%BD%D1%85%D0%B5%D0%B9%D0%BC,+%D0%9D%D0%BE%D1%80%D0%B2%D0%B5%D0%B3%D0%B8%D1%8F/@63.433962,10.3154331,12z/data=!3m1!4b1!4m6!3m5!1s0x466d319747037e53:0xbf7c8288f3cf3d4!8m2!3d63.4305149!4d10.3950528!16zL20vMDlidGs?entry=ttu";

      case "Geirangerfjord":
        return "https://www.google.com/maps/place/%D0%93%D0%B5%D0%B9%D1%80%D0%B0%D0%BD%D0%B3%D0%B5%D1%80-%D1%84%D1%8C%D0%BE%D1%80%D0%B4/@61.6246047,6.6317331,7.66z/data=!4m6!3m5!1s0x46169d427b268c51:0xb8c99540dcc397fe!8m2!3d62.101506!4d7.0940817!16zL20vMDZ4eXFi?entry=ttu";

      case "Harstad":
        return "https://maps.google.com/maps?q=Harstad&amp;t=&amp;z=10&amp;ie=UTF8&amp;iwloc=&amp;output=embed";

      default:
        return "https://www.google.com/maps/place/%D0%9D%D0%BE%D1%80%D0%B2%D0%B5%D0%B3%D0%B8%D1%8F/@64.1819886,7.2178203,5z/data=!3m1!4b1!4m6!3m5!1s0x461268458f4de5bf:0xa1b03b9db864d02b!8m2!3d60.472024!4d8.468946!16zL20vMDViNHc?entry=ttu";
    }
  };

  return (
    <section
      id="Hero"
      className={`hero bg-${activeBg} ${isVisible ? "" : "loading-container"}`}
    >
      <div className="container hero-content">
        <div className="blockOfElements">
          <div className="socials-header">
            <ul>
              {socials.map((social) => (
                <li key={social}>
                  <a href="#">
                    <svg aria-label={social}>
                      <use href={`/sprite.svg#icon-${social}`} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="main-title">
            <span>explore</span>norway
          </h1>
          <button
            className="button-chevron"
            type="button"
            onClick={handleClickNext}
          >
            <VscChevronRight />
          </button>
        </div>
        <div className="blockOfElements blockOfElements-second">
          <Link to="Activities" className="button-reverse">
            <TbArrowNarrowLeft />
            see more
          </Link>

          <ul className="locations">
            {cities.map((city) => (
              <li
                key={city}
                className="locations-block"
                onClick={() => {
                  setIsMapOpen(true);
                  setCurrentCity(city);
                }}
              >
                <CiLocationOn />
                <div>
                  <h6> {city} </h6>
                  <p>Plan a trip</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              className="button-chevron"
              type="button"
              onClick={handleClickPrev}
            >
              <VscChevronLeft />
            </button>
            <p>
              <span className="activeBg">
                {activeBg <= 9 && 0}
                {activeBg}{" "}
              </span>
              / {amountOfBgs <= 9 && 0}
              {amountOfBgs}
            </p>
          </div>
        </div>
      </div>

      {isMapOpen && (
        <Portal wrapperId="map">
          <div className="modal-backdrop">
            <div className="modal-background">
              <button
                type="button"
                className="burger-close"
                onClick={handleMapToggle}
              >
                <IoIosClose />
              </button>

              <MapComponent />
            </div>
          </div>
        </Portal>
      )}
    </section>
  );
}
