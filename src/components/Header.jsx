import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import jsonData from "../backend/catalog.json";
import CategoryScreen from "./CategoryScreen.jsx";
import Home from "./Home.jsx";
function Header() {
  const [location, setLocation] = useState([]);
  const [subLocation, setSubLocation] = useState([]);
  const [subLocationItem, setSubLocationItem] = useState();
  const [locationFlag, setLocationFlag] = useState(false);
  const [subLocationFlag, setSubLocationFlag] = useState(false);
  const [categoriesFlag, setCategoriesFlag] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    setLocationFlag(false);
    setSubLocationFlag(false);
  });

  useEffect(() => {
    if (jsonData.status === "success" && jsonData.data.locations) {
      setLocation(jsonData.data.locations);
    }
  }, []);

  const getLocation = () => {
    setLocationFlag(!locationFlag);
  };
  const getSubLocation = item => {
    setSubLocationFlag(true);
    setSubLocation(item.branches);
  };

  return (
    <>
      <header className="page-header">
        <nav>
          <div className="logo">
            <Link to="/">RENTAL MANAGEMENT SYSTEM</Link>
          </div>
          <div ref={ref}>
            <ul>
              <li className="nav__menu-item">
                <span onClick={getLocation}>Select Location</span>
                {locationFlag ? (
                  <ul className="nav__submenu">
                    {location.map((item, i) => (
                      <li
                        key={i}
                        className="nav__submenu-item"
                        onClick={() => getSubLocation(item)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            </ul>
            {subLocationFlag ? (
              <ul className="sublocation nav__submenu1">
                {subLocation.map((subitem, i) => (
                  <li
                    className="nav__submenu-item"
                    key={i}
                    onClick={() => {
                      setCategoriesFlag(true);
                      setSubLocationItem(subitem);
                      setLocationFlag(false);
                      setSubLocationFlag(false);
                    }}
                  >
                    {subitem.name}{" "}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </nav>
      </header>
      {categoriesFlag ?
      <CategoryScreen categories={subLocationItem} /> : <Home />}
    </>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default Header;
