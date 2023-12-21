import { Link } from "react-scroll";

const socials = ["facebook", "twitter", "youtube", "instagram", "dribble"];

export function Footer() {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  return (
    <footer className="footer">
      <Link to="Hero" className="logo logo-column logo-footer">
        <img src="/logo.svg" alt="logo" />
        <p>TRAVELx</p>
      </Link>
      <nav className="navigation navigation-row navigation-wrap">
        <Link to="Activities">Activities</Link>
        <Link to="About us">About us</Link>
        <Link to="Beauties">Beauties</Link>
        <Link to="Network">Network</Link>
        <a
          href="https://www.iubenda.com/en/privacy-and-cookie-policy-generator?utm_source=google&utm_medium=ppc_page&utm_campaign=row_pcp_new_search&utm_term=privacy%20policy%20template&utm_content=628824560331&gclid=Cj0KCQiA4Y-sBhC6ARIsAGXF1g6BxcoHVOWfZTO6SNJ-2nNZZhUndfzEN19bV84mkjaA6OuL8AVdJVsaAjI7EALw_wcB"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </nav>
      <div className="footer-bottom container">
        <p>
          © 2020 Bikart Design. All rights reserved{" "}
          <span>© {currentYear} Prysiazhnaia Anastasia Developer</span>
        </p>
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
    </footer>
  );
}
