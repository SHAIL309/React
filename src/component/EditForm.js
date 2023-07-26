import React, { useState } from "react";

const EditForm = ({ value, onSave, onCancel, Type }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    // console.log("inputValues", inputValue);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div>
      <input type={Type} value={inputValue} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default EditForm;
