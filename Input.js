import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

const Ip = ({ type }) => {
  console.log("type", type);
  const [temp, setTemp] = useState();
  const [res, setRes] = useState("");
  const handleInput = (e) => {
    const value = e.target.value;
    setTemp(value);
  };
  const HandleConvert = (value) => {
    console.log("type", type);
    if (type === "fahrenheit") {
      value = (temp - 32) * (5 / 9);
      console.log(value);
      setRes(value);
    }
    if (type === "kelvin") {
      value = temp - 273.15;
      setRes(value);
      console.log(value);
    }
    if (type === "celsius") {
      value = temp;
      setRes(value);
      console.log(value);
    }
  };

  return (
    <>
      <br />
      <TextField
        label="Degrees"
        variant="outlined"
        style={{ padding: "7px" }}
        placeholder="enter the tempreture you want to convert"
        onChange={handleInput}
      />

      <Button variant="contained" onClick={HandleConvert}>
        Convert
      </Button>
      <br />

      <div>
        <p style={{ opacity: "0.4" }}> Result</p>
        <label style={{ border: "3px" }}>
          The Converted Result is{" "}
          <strong
            style={{ fontSize: "44px", fontStyle: "Times New Roman, serif" }}
          >
            {res}
          </strong>{" "}
          Degree Celsius
        </label>
      </div>
    </>
  );
};
export default Ip;
