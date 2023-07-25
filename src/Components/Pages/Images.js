import { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import styles from "../Styles/HomePage.module.css";
import Message from "./Message";
import NavButton from "../navigateButtons/NavButton";
import SALE from "../../Icons/sale.png";
import Menu from "../Menu/Menu";
// import { Parallax, ParallaxLayer } from "@react-spring/parallax";
const IMAGES = ({
  children,
  Current,
  Prev,
  Next,
  src,
  src2,
  alt,
  src_video,
  message,
  Isimage,
  hidden,
  handleY,
  key_val,
  Reverse,
  // length,
}) => {
  const [direction, setDirection] = useState(-window.innerWidth);

  const [isOpen, setIsOpen] = useState(false);
  const handleOnWheel = (e) => {
    handleY(e.deltaY);
  };

  const handleDirection = (val) => {
    setDirection(val);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{
          x: direction,
          transition: { duration: 0.3, ease: easeInOut },
        }}
        onWheel={handleOnWheel}
        id="content"
      >
        <NavButton
          Current={Current}
          Prev={Prev}
          Next={Next}
          hide={hidden}
          handleDirection={handleDirection}
        />

        {Isimage ? (
          <>
            <div
              className={styles.bgImg}
              style={{ backgroundImage: `url(${src2})` }}
            >
              <img
                className={
                  Reverse
                    ? styles.img_slide_up
                    : key_val === 0
                    ? styles.img_slide  
                    : styles.img_slide_down
                }
                src={src}
                alt={alt}
                key={key_val}
              />
              <Message message={message} />
            </div>
          </>
        ) : (
          <>
            <div
              className={styles.bgImg}
              style={{ backgroundImage: `url(${src2})` }}
            >
              <video
                autoPlay
                loop
                className={Reverse ? styles.video_reverse : styles.video}
              >
                <source src={src_video} type="video/mp4" />
              </video>
              <img
                className={styles.sale_text}
                src={SALE}
                alt={alt}
                onClick={() => {
                  setIsOpen(true);
                }}
              />
            </div>
          </>
        )}

        {children}
      </motion.div>
      {isOpen && <Menu closeModal={closeModal} />}
    </>
  );
};

export default IMAGES;
