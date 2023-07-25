import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import styles from "./header.module.css";
import Button from "../buttons/button";
import LogoutIcon from "../images/logout.png";
import AvatarIcon from "../images/Avatar.png";
const Header = () => {
  const navigate = useNavigate();
  // const user = localStorage
  //   .getItem("userName")
  //   .substring(0, localStorage.getItem("userName").indexOf("@"));
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("idToken", "");
        localStorage.setItem("userName", "");
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className={styles.content}>
      <div className={styles.User}>
        <img src={AvatarIcon} alt="Avatar"width="65px"height="60px" />
      </div>

      <Button
        className={styles.button}
        name={<img src={LogoutIcon} alt="Logout" height="30px" width="30px" />}
        onClick={handleLogout}
      />
    </div>
  );
};
export default Header;
