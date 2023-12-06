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

const cities = ["Trondheim", "Eresfjird", "Harstad"];

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
        return { lat: 63.42962280888552, lng: 10.393314691943125 };
      case "Eresfjird":
        return { lat: 62.70252677981998, lng: 8.143237336424702 };
      case "Harstad":
        return { lat: 68.79864025933036, lng: 16.541545439041542 };
      default:
        return { lat: 59.91198609954394, lng: 10.753975432760225 };
    }
  };

  return (
    <section
      id="Hero"
      className={`hero bg-${activeBg} ${isVisible ? "" : "loading-container"}`}
    >
      <div className="hero-overlay">
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
      </div>

      {isMapOpen && (
        <Portal wrapperId="map">
          <div className="modal-backdrop">
            <div className="modal-background">
              <button
                type="button"
                className="burger-close modal-close"
                onClick={handleMapToggle}
              >
                <IoIosClose />
              </button>
              <h2 className="modal-title">Map</h2>
              <MapComponent place={currentLocation()} />
            </div>
          </div>
        </Portal>
      )}
    </section>
  );
}
