import img from "../assets/content/about/aboutUs.webp";

import { getAltNameFromPath } from "../helpers";

import { Subtitle, Title } from ".";
import { useScreenQuery } from "../hooks";

const text = [
  {
    name: "Sustainable",
    description:
      "Join us on a journey where each travel story is woven with threads of environmental stewardship and cultural appreciation.",
  },
  {
    name: "Fair & Share",
    description:
      "Our travel-oriented platform is dedicated to creating meaningful connections between travelers and local communities in Norway.",
  },
  {
    name: "Experience",
    description:
      "Join us in creating a positive impact on the places you visit and fostering fair and sustainable tourism practices.",
  },
];

export function AboutUs() {
  const { isScreenTabletLg } = useScreenQuery();

  return (
    <section id="About us" className="section container">
      <Subtitle name="About Us" /> <Title name="Our Philosophy" />
      <div className="about-content">
        <img src={img} alt={getAltNameFromPath(img)} className="about-img" />
        <ol className="about-list">
          {text.map((block, index) => (
            <li
              key={block.name}
              className={`about-item ${
                !isScreenTabletLg && index % 2 !== 0
                  ? "about-item__reverse"
                  : ""
              }`}
            >
              <span className="about-number">
                {index <= 9 && 0}
                {index + 1}
              </span>
              <div
                className={` ${
                  !isScreenTabletLg && index % 2 !== 0
                    ? "about-item__reverse-text"
                    : ""
                }`}
              >
                <h4 className="about-title"> {block.name} </h4>
                <p className="about-description"> {block.description} </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
