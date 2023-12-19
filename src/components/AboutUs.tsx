import img from "../assets/jpg/content/about-us.jpg";

import { getAltNameFromPath } from "../helpers";

import { Subtitle, Title } from ".";

const text = [
  {
    name: "Sustainable",
    description:
      "Join us on a journey where each travel story is woven with threads of environmental stewardship and cultural appreciation.",
  },
  {
    name: "Fair & Share",
    description:
      "Join us in creating a positive impact on the places you visit and fostering fair and sustainable tourism practices. Join us in creating a positive impact on the places you visit and fostering fair and sustainable tourism practices.",
  },
  {
    name: "Experience",
    description:
      "Join us in creating a positive impact on the places you visit and fostering fair and sustainable tourism practices.",
  },
];

export function AboutUs() {
  return (
    <section id="About us" className="section container">
      <Subtitle name="About Us" /> <Title name="Our Philosophy" />
      <div className="about-content">
        <img src={img} alt={getAltNameFromPath(img)} className="about-img" />
        <ol className="about-list">
          {text.map((block, index) => (
            <li className="about-item">
              <span className="about-number">
                {index <= 9 && 0}
                {index + 1}
              </span>
              <div>
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
