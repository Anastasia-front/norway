import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-scroll";

import { useKeyPress, useScreenQuery, useScrollLock } from "../hooks";

import { Portal } from ".";


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useKeyPress("Escape", handleMenuToggle);

  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isMenuOpen, lockScroll, unlockScroll]);

  const { isScreenTabletXl } = useScreenQuery();

  const classNameLogo = !isMenuOpen ? "logo-row" : "logo-column";
  const classNameNavigation = isScreenTabletXl
    ? "navigation-row"
    : "navigation-column";

  return (
    <header className="container header">
      <Link to="Hero" className={`logo ${classNameLogo}`}>
        <img src="/logo.svg" alt="logo" />
        <p>TRAVELx</p>
      </Link>

      {!isScreenTabletXl ? (
        !isMenuOpen ? (
          <button
            type="button"
            className="burger-button"
            onClick={handleMenuToggle}
          >
            <RxHamburgerMenu />
          </button>
        ) : (
          <Portal wrapperId="burger-menu">
            <div className="burger-background">
              <button
                type="button"
                className="burger-close"
                onClick={handleMenuToggle}
              >
                <IoIosClose />
              </button>

              <div className="burger-column">
                <Link to="Hero" className={`logo ${classNameLogo}`}>
                  <img src="./logo.svg" alt="logo" />
                  <p>TRAVELx</p>
                </Link>
                <nav className={`navigation ${classNameNavigation}`}>
                  <Link to="Activities">Activities</Link>
                  <Link to="About us">About us</Link>
                  <Link to="Beauties">Beauties</Link>
                  <Link to="Network">Network</Link>
                </nav>
              </div>
            </div>
          </Portal>
        )
      ) : (
        <nav className={`navigation ${classNameNavigation}`}>
          <Link to="Activities">Activities</Link>
          <Link to="About us">About us</Link>
          <Link to="Beauties">Beauties</Link>
          <Link to="Network">Network</Link>
        </nav>
      )}
    </header>
  );
}
