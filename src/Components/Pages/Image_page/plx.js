import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import bg1 from "../../../backgrounds/Women/Women_bg1.jpg";
import bg2 from "../../../backgrounds/Women/Women_bg2_2 .jpg";
import bg3 from "../../../backgrounds/Women/Women_bg3_2.jpg";
import bg5 from "../../../backgrounds/Women/Women_bg4_2.jpg";
import bg4 from "../../../backgrounds/Women/Women_bg5_2.jpg";
const PLX = () => {
  const Images = [bg1, bg2, bg3, bg4, bg5];
  return (
    <div>
      <Parallax pages={5}>
        <ParallaxLayer offset={0}>
          <div>
            <img
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                objectFit: "cover",
                width: "100%",
                height: "100vh",
              }}
              src={Images[0]}
              alt="women"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1}>
          <div>
            <img
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                objectFit: "cover",
                width: "100%",
                height: "100vh",
              }}
              src={Images[1]}
              alt="women"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2}>
          <div>
            <img
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                objectFit: "cover",
                width: "100%",
                height: "100vh",
              }}
              src={Images[2]}
              alt="women"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <div>
            <img
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                objectFit: "cover",
                width: "100%",
                height: "100vh",
              }}
              src={Images[3]}
              alt="women"
            />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          <div>
            <img
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                objectFit: "cover",
                width: "100%",
                height: "100vh",
              }}
              src={Images[4]}
              alt="women"
            />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};
export default PLX;
