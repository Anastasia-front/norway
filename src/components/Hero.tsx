import { useState } from "react";

import { CiLocationOn } from "react-icons/ci";
import { TbArrowNarrowLeft } from "react-icons/tb";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

import { Link } from "react-scroll";
import { Portal } from ".";

const socials = ["facebook", "twitter", "youtube", "instagram", "dribble"];

const cities = ["Trondheim", "Geirangerfjord", "Lofoten"];

export function Hero() {
  const amountOfBgs = 7;
  const [activeBg, setActiveBg] = useState(1);
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
              <li key={city}>
                <div
                  className="locations-block"
                  onClick={() => {
                    setIsMapOpen(true);
                  }}
                >
                  <CiLocationOn />
                  <div>
                    <h6> {city} </h6>
                    <p>Plan a trip</p>
                  </div>
                </div>
                {isMapOpen && (
                  <Portal wrapperId="map">
                    <iframe
                      src="city"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="map"
                    />
                  </Portal>
                )}
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
    </section>
  );
}
