import styles from "../../Styles/HomePage.module.css";
import men1 from "../../../backgrounds/Men/men_bg1.jpg";
import men2 from "../../../backgrounds/Men/men_bg2.jpg";
import men4 from "../../../backgrounds/Men/men_bg4.jpg";
import men5 from "../../../backgrounds/Men/men_bg5.jpg";
import bg7 from "../../../backgrounds/Common/Tags_bg.jpg";
import bg8 from "../../../backgrounds/Common/end_bg.jpg";
import man_vid from "../../../videos/man.mp4";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../Images";
import { PAGE } from "../../../slice";
const ManPage = () => {
  const dispatch = useDispatch();
  const Images = [men1, man_vid, men2, men4, men5, bg7, bg8];
  const [image, setImage] = useState(0);
  const [isReverse, setIsReverse] = useState(false);
  // const [hidden, setHidden] = useState(false);
  const prevImageRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = image < Images.length - 1 ? image + 1 : image;
      setIsReverse(prevImageRef.current > nextIndex);
      setImage(nextIndex);
      dispatch(PAGE(nextIndex));
      prevImageRef.current = nextIndex;
    }, 5000);

    return () => clearTimeout(timer);
  }, [image]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const handleY = (y) => {
    if (y > 0) {
      const nextIndex = image < Images.length - 1 ? image + 1 : image;
      setIsReverse(false);
      setImage(nextIndex);
      dispatch(PAGE(nextIndex));
    }
    if (y < 0 && image > 0) {
      const nextIndex = image <= Images.length ? image - 1 : image;
      setImage(nextIndex);
      dispatch(PAGE(nextIndex));
      setIsReverse(true);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "ArrowDown") {
      const nextIndex = image < Images.length - 1 ? image + 1 : image;
      setIsReverse(false);
      setImage(nextIndex);
      dispatch(PAGE(nextIndex));
    } else if (event.key === "ArrowUp" && image > 0) {
      const nextIndex = image <= Images.length ? image - 1 : image;
      setIsReverse(true);
      setImage(nextIndex);
      dispatch(PAGE(nextIndex));
    }
  };
  // useEffect(() => {
  //   if (image === Images.length - 1) {
  //     setHidden(!hidden);
  //   } else {
  //     setHidden(false);
  //   }
  // }, [image, hidden]);
  return (
    <>
      <IMAGES
        // hidden={hidden}
        Reverse={isReverse}
        Current="Man"
        Prev="Women"
        Next="kids"
        src={Images[image]}
        src2={image > 0 && !isReverse ? Images[image - 1] : Images[image]}
        alt="man"
        key_val={image}
        message="NEW"
        src_video={Images[1]}
        handleY={handleY}
        Isimage={image === 1 ? false : true}
        children={
          image === Images.length - 1 ? (
            <div className={styles.content}>
              <div
                style={{
                  fontSize: "20px",
                  alignItems: "center",
                  height: "100px",
                }}
              >
                <a
                  href="https://www.zara.com/in/en/z-newsletter-nl1400.html?v1=11110"
                  target="blank"
                >
                  JOIN OUR NEWSLETTER
                </a>
              </div>
              <div className={styles.social}>
                <p>
                  <a href="https://www.instagram.com/zara/" target="blank">
                    INSTAGRAM
                  </a>
                </p>
                <p>
                  <a href="https://www.facebook.com/Zara" target="blank">
                    FACEBOOK
                  </a>
                </p>
                <p>
                  <a href="https://twitter.com/ZARA" target="blank">
                    TWITTER
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.pinterest.es/zaraofficial/"
                    target="blank"
                  >
                    PINTREST
                  </a>
                </p>
                <p>
                  <a href="https://www.youtube.com/user/zara" target="blank">
                    YOUTUBE
                  </a>
                </p>
                <p>
                  <a
                    href="https://open.spotify.com/user/r6ivwuv0ebk346hhxo446pbfv"
                    target="blank"
                  >
                    SPOTIFY
                  </a>
                </p>
              </div>
            </div>
          ) : (
            ""
          )
        }
      />
    </>
  );
};
export default ManPage;
