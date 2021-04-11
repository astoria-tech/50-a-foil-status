import HamburgerMenu from "react-hamburger-menu";
import Drawer from "../Toolbar/Drawer/Drawer";
import React, { useState } from "react";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
        <div
          className={
            menuOpen
              ? "hamburger_menu_container open"
              : "hamburger_menu_container"
          }
        >
          <HamburgerMenu
            isOpen={menuOpen}
            menuClicked={() =>
              setMenuOpen((prev) => {
                return !prev;
              })
            }
            width={30}
            height={15}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.1}
          />
        </div>
        <div className="header_content">
          <svg
            className="torch-icon"
            fill="none"
            viewBox="0 0 71 150"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#000">
              <path d="m33 0v14.0625h4.6875v-4.6875h4.6875v-4.6875h4.6875v9.375h4.6875v9.375h4.6875v4.6875h4.6875v4.6875h4.6875v14.0625h-4.6875v4.6875h-4.6875v4.6875h-9.375c0-1.4063 0-2.9063 0-4.6875h4.6875v-14.0625h-4.6875v-4.6875h-4.6875v-4.6875c-1.5938 0-3.0937 0-4.6875 0v4.6875h-4.6875v-4.6875h-4.6875v-4.6875h-4.6875v14.0625h-4.6875v14.0625h4.6875v4.6875h-9.375v-4.6875h-4.6875v-4.6875h-4.6875v-18.75h4.6875v-9.375h4.6875v-4.6875h4.6875v-4.6875h4.6875v-4.6875h4.6875v-4.6875z" />
              <path d="m42.375 145.312v4.407h-.2812-13.7813v-4.407h-4.6875v-56.2495h-4.6875v-4.6875h-4.6875v-4.6875h-4.6875v-4.6875h-9.375c0-4.6875 0-9.375 0-14.0625h70.3125v14.0625h-9.375v4.6875h-4.6875v-4.6875h-4.6875c-1.5 0-3.0469 0-4.6875 0v4.6875h-4.6875v4.6875h-4.6875c-.4219 10.4063-.2344 58.359 0 60.937zm4.6875-79.687h-4.6875v4.6875h4.6875zm9.375 0h-4.6875v4.6875h4.6875zm9.375 0h-4.6875v4.6875h4.6875z" />
              <path d="m56.4375 79.6875v4.6875h-4.6875v4.6875h-4.6875v56.2495h-4.6875v-60.937h4.6875v-4.6875z" />
              <path d="m33 42.1875v9.375h-4.6875v-9.375z" />
              <path d="m37.6875 42.1875h4.6875v9.375h-4.6875z" />
              <path d="m33 42.1875v-4.6875h4.6875v4.6875z" />
            </g>
          </svg>
          <h1>Track 50-a</h1>
        </div>

        <Drawer open={menuOpen} closeMenu={() => setMenuOpen(false)} />
      </header>
  );
};

export default Header;