import { BiSolidQuoteLeft } from "react-icons/bi";

import { Subtitle, Title } from ".";

import p3 from "../assets/png/partners/lakehouse.png";
import p2 from "../assets/png/partners/magento.png";
import p1 from "../assets/png/partners/microsoft.png";
import p4 from "../assets/png/partners/midea.png";

import per1 from "../assets/png/persons/Alan Jackson.png";
import per2 from "../assets/png/persons/Jane Cooper.png";
import per3 from "../assets/png/persons/Michael Person.png";

import { getAltNameFromPath } from "../helpers";

const partners = [p1, p2, p3, p4];
const comments = [
  {
    name: getAltNameFromPath(per1),
    position: "CEO, ABC Corporation",
    img: per1,
    text: "I had the most incredible experience with this travel company during my trip to Norway. Their attention to detail and commitment to delivering exceptional service stood out. The knowledgeable staff provided valuable insights, ensuring I didn't miss any hidden gems. From seamless logistics to expertly crafted itineraries, every aspect of my journey was taken care of with precision.",
  },
  {
    name: getAltNameFromPath(per2),
    position: "CEO, Travelers Community ",
    img: per2,
    text: "I applaud this travel company for their strong commitment to sustainable and responsible travel. It's refreshing to see a company actively promoting eco-friendly practices and cultural preservation. They go the extra mile to ensure that travelers not only enjoy the beauty of Norway but also contribute positively to the environment and local communities. A truly conscious and ethical approach to exploring this stunning destination.",
  },
  {
    name: getAltNameFromPath(per3),
    position: "CEO, Go Travel",
    img: per3,
    text: "What sets this travel company apart is their dedication to creating personalized and unforgettable experiences. They took the time to understand my preferences and crafted a tailor-made itinerary that exceeded all expectations. From thrilling outdoor adventures to cultural immersions, every moment was curated to match my interests. The passion and commitment of the team truly made my journey through Norway one for the books.",
  },
];

export function Network() {
  return (
    <section id="Network" className="section container">
      <Subtitle name="NETWORK" />
      <Title name="Our Partners" />
      <ul className="partners-list">
        {partners.map((partner) => (
          <li key={`${partner}`} className="partners-item">
            <img src={partner} alt={getAltNameFromPath(partner)} />
          </li>
        ))}
      </ul>
      <div className="comment-bg">
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.name} className="comment-item">
              <p className="comment-text">
                <BiSolidQuoteLeft /> {comment.text}
                <svg className="comment-text__triangle" aria-label="triangle">
                  <use href="/sprite.svg#icon-triangle" />
                </svg>
              </p>
              <div className="comment-person">
                <img src={comment.img} alt={getAltNameFromPath(comment.img)} />
                <div>
                  <p> {comment.name} </p>
                  <span> {comment.position} </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
