import Select from "./Components/Select";
import React from "react";
import Ip from "./Components/Input";
import { useState } from "react";

export default function Result() {
  const [type, setType] = useState("celsius");

  const handleSelectType = (type) => {
    setType(type);
  };

  return (
    <>
      <Select handleSelectType={handleSelectType} />

      <Ip type={type} />
    </>
  );
}
