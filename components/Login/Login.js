import styles from "./Login.module.css";
import Input from "../Inputs/input";
import Button from "../buttons/button";

import Card from "../Card/card";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { errorToast, successToast } from "../Toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // console.log("signedin");
        localStorage.setItem("idToken", userCredential._tokenResponse.idToken);
        localStorage.setItem("userName", userCredential._tokenResponse.email);
        // localStorage.setItem()
        // const user = userCredential.user;
        const user = localStorage
          .getItem("userName")
          .substring(0, localStorage.getItem("userName").indexOf("@"));
        successToast(`Welcome ${user}`);
        navigate("/ExamsList");
        // console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        errorToast("login Failed");
      });
  };

  return (
    <div className={styles.login}>
      <Card>
        
        <form onSubmit={(e) => onLogin(e)}>
          <div className={styles.input_div}>
            <Input
              label="Email address" 
              required="required"
              placeholder=" Email"
              type="email"
              
              handleChange={(e) => {
                e.preventDefault();
                setemail(e.target.value);
              }}
            />
          </div>
          <div className={styles.input_div}>
            <Input
            label="password"
              required="required"
              placeholder="password"
              type="password"
              
              handleChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <Button
              type="submit"
              className={styles.button}
              name="AUTHENTICATE"
              disable={!email && !password}
            />
          </div>
          <p>
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </Card>
    </div>
  );
};
export default Login;
