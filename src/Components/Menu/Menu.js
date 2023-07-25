import { useEffect, useState } from "react";
import CrossIcon from "../../Icons/crossIcon";
import styles from "../Styles/Menu.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Menu = ({ closeModal }) => {
  const navigate = useNavigate();
  const page = useSelector((state) => state.page);
  const [isOpen, setOpen] = useState(true);
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);
  const HandleClose = () => {
    closeModal();
    setOpen(!isOpen);
  };
  const handleChange = (Id) => {
    navigate(`/${Id}`);
  };
  let bg;
  let border;
  let width;
  let text;
  page === 1
    ? (border = "black") &&
      (bg = "yellow") &&
      (width = "2px") &&
      (text = "SALE")
    : (bg = "white") &&
      (border = "yellow") &&
      (width = "5px") &&
      (text = "NEW COLLECTION");
  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.fadeIn : styles.fadeout}`}
    >
      <div className={styles.content}>
        <button
          className={styles.close_button}
          onClick={() => {
            setOpen(!isOpen);
            setTimeout(() => {
              HandleClose();
            }, 500);
          }}
        >
          {<CrossIcon size={28} />}
        </button>
        <nav className={styles.customer_type}>
          <button
            id="Women"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleChange("Women")}
          >
            <span>WOMEN</span>
          </button>
          <button
            id="Man"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleChange("Man")}
          >
            <span>MAN</span>
          </button>
          <button
            id="kids"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleChange("Kids")}
          >
            <span>KIDS</span>
          </button>
          <button
            id="beauty"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => handleChange("Beauty")}
          >
            <span>BEAUTY</span>
          </button>
        </nav>
      </div>
      <div className={styles.collections}>
        <div
          style={{
            margin: "0px 0px 50px 100px",
            border: `${width} solid ${border}`,
            backgroundColor: `${bg}`,
            padding: "3px",
          }}
        >
          {text}
        </div>
        <ul>
          <li> {""}</li>
          <li>NEW</li>
          <li> {""}</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
          <li>LINEN</li>
        </ul>
      </div>
    </div>
  );
};
export default Menu;
