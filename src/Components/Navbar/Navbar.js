import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Black_HamBurger from "../../Icons/Black_hamburger.png";
import White_HamBurger from "../../Icons/White_hamburger.png";
import Zara_Black from "../../Icons/Zara_Black_logo.png";
import Zara_Yellow from "../../Icons/Zara_Yellow_logo.png";
import Zara_White from "../../Icons/Zara_White_logo.png";
import styles from "../Styles/Navbar.module.css";
import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuType, setMenuType] = useState(White_HamBurger);
  const [ZaraLogo, setZaraLogo] = useState(Zara_White);
  const [CartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const pageNumber = useSelector((state) => state.page);
  const navigate = useNavigate( );
  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (pageNumber !== 1 && pageNumber < 4) {
      setMenuType(White_HamBurger);
      setZaraLogo(Zara_White);
      setCartCount(pageNumber);
    } else if (pageNumber === 1) {
      setMenuType(Black_HamBurger);
      setZaraLogo(Zara_Yellow);
      setCartCount(pageNumber);
    } else {
      setMenuType(Black_HamBurger);
      setZaraLogo(Zara_Black);
      setCartCount(pageNumber);
    }
  }, [pageNumber]);
  return (
    <div className={styles.navbarDiv}>
      <div className={styles.leftDiv}>
        {pageNumber !== 1 && (
          <button
            className={styles.sideMenu}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img src={menuType} alt="Menu" width="20px" height="20px" />
          </button>
        )}
        <h1
          className={
            pageNumber === 1 ? styles.zaraHeader_animated : styles.zaraHeader
          }
        >
          <img
            src={ZaraLogo}
            alt="ZARA"
            width="300px"
            height="100px"
            onClick={() => navigate("/")}
          />
        </h1>
      </div>
      {pageNumber !== 1 && (
        <div className={styles.rightDiv}>
          <button
            className={
              pageNumber < 4 ? styles.buttons_white : styles.buttons_black
            }
            onClick={() => {
              window.location.href = "https://www.zara.com/in/en/search";
            }}
          >
            SEARCH
          </button>
          <button
            className={
              pageNumber < 4 ? styles.buttons_white : styles.buttons_black
            }
            onClick={() => {
              window.location.href = "https://www.zara.com/in/en/logon";
            }}
          >
            LOG IN
          </button>
          <button
            className={
              pageNumber < 4 ? styles.buttons_white : styles.buttons_black
            }
            onClick={() => {
              window.location.href = "https://www.zara.com/in/en/help-center";
            }}
          >
            HELP
          </button>
          <button
            className={
              pageNumber < 4 ? styles.buttons_white : styles.buttons_black
            }
          >
            CART{`(${CartCount})`}
            {/* <img src={CartIcon} alt="CART" width="24px" height="24px" />
          {<span className={styles.CartCount}>{CartCount}</span>} */}
          </button>
        </div>
      )}
      {isOpen && <Menu closeModal={closeModal} />}
    </div>
  );
};
export default Navbar;
