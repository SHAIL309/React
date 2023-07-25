import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { errorToast, successToast } from "../Toast";

import Card from "../Card/card";
import styles from "./signup.module.css";
import Input from "../Inputs/input";
import Button from "../buttons/button";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        successToast(`successfully Registerd as ${name} `);
        console.log(user);
        navigate("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        errorToast(errorMessage);

        // ..
      });
  };

  return (
    <div className={styles.main}>
      <Card>
        <form>
          <h1> Examcenter </h1>
          <div className={styles.input_div}>
            <Input
              type="text"
              label="Name"
              handleChange={handleName}
              required
              placeholder="What' your name"
            />
          </div>
          <div className={styles.input_div}>
            <Input
              type="email"
              label="Email address"
              handleChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>

          <div className={styles.input_div}>
            <Input
              type="password"
              label="Create password"
              handleChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <Button
            type="submit"
            className={styles.button}
            onClick={onSubmit}
            name="Sign up"
          />
          <p>
            Already have an account?{" "}
            <Link className={styles.a} to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
