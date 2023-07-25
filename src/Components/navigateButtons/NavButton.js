import styles from "../Styles/NavButton.module.css";
import back from "../../Icons/211689_left_arrow_icon.png";
import next from "../../Icons/211607_right_arrow_icon.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ Current, Prev, Next, hide, handleDirection }) => {
  const [beforePage, setBefore] = useState(true);
  const [AfterPage, setAfter] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (Current === "Women" || hide) {
      setBefore(false);
    }
    if (Current === "beauty" || hide) {
      setAfter(false);
    }
  }, [Current, hide]);

  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft" && beforePage) {
      handlePrevCustomer();
    } else if (event.key === "ArrowRight" && AfterPage) {
      handleNextCustomer();
    }
  };
  const handlePrevCustomer = () => {
    navigate(`/${Prev}`);
    handleDirection(window.innerWidth);
  };

  const handleNextCustomer = () => {
    navigate(`/${Next}`);
    handleDirection(-window.innerWidth);
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.backArrow}
        hidden={!beforePage}
        onClick={handlePrevCustomer}
      >
        <img src={back} alt="Previous" width="35px" />
      </button>

      <button
        className={styles.nextArrow}
        hidden={!AfterPage}
        onClick={handleNextCustomer}
      >
        <img src={next} alt="Next" width="35px" />
      </button>
    </div>
  );
};

export default NavButton;
