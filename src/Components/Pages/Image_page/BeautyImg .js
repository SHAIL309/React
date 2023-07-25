import styles from "../../Styles/HomePage.module.css";
import bg1 from "../../../backgrounds/Beauty/beauty_bg1.jpg";
import bg7 from "../../../backgrounds/Common/Tags_bg.jpg";
import bg8 from "../../../backgrounds/Common/end_bg.jpg";
import beauty_vid from "../../../videos/beauty.mp4";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../Images";
import { PAGE } from "../../../slice";
const BeautyPage = () => {
  const dispatch = useDispatch();
  const Images = [bg1, beauty_vid, bg7, bg8];
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
        Current="beauty"
        Prev="kids"
        Next="Beauty"
        alt="beauty"
        src={Images[image]}
        src2={image > 0 && !isReverse ? Images[image - 1] : Images[image]}
        message="NEW"
        handleY={handleY}
        key_val={image}
        Isimage={image === 1 ? false : true}
        src_video={Images[1]}
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
export default BeautyPage;
