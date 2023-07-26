import { useState } from "react";
import "./Form.css";
import List from "../List/List";
import { useDispatch, useSelector } from "react-redux";
import { act } from "../../slice";
export const Form = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.values);

  const [Id, setId] = useState(data.id);
  const [Name, setName] = useState(data.name);
  const [Age, setAge] = useState(data.age);
  const [Dob, setDob] = useState(data.dob);
  const [isSubmit, setSubmit] = useState(false);
  const [formInputData, setData] = useState(data);

  const handleFilter = (e) => {
    dispatch(act.Filter(e.target.value));
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSubmit(true);
    setData({
      ...formInputData,
      [e.target.id]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.dob]: e.target.value,
      [e.target.age]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (isSubmit) {
      dispatch(act.Add(formInputData));
    }
    setSubmit(false);
    // setId(null);
    // setName(null);
    // setAge(null);
    // setDob(null);
  };

  const style = {
    backgroundColor: isSubmit ? "lightGreen" : "red",
    padding: "10px",
  };
  return (
    <div className="box">
      <h1>Add your Details</h1>

      <div className="form">
        <label>Id :</label>
        <input
          placeholder="set the Id"
          type="number"
          value={Id}
          name="id"
          onChange={handleChange}
          required
        />

        <label>Name :</label>
        <input
          placeholder="What's your Name"
          type="text"
          value={Name}
          name="Name"
          onChange={handleChange}
          required
        />
        <label>Age :</label>
        <input
          placeholder="How old are you?"
          type="number"
          value={Age}
          onChange={handleChange}
          name="age"
          required
        />
        <label>Date of Birth :</label>
        <input
          type="date"
          value={Dob}
          onChange={handleChange}
          name="dob"
          required
        />

        <div>
          <div>
            <button onClick={handleSubmit} style={style}>
              <strong
                className="add"
                style={{
                  fontFamily: " monospace",
                }}
              >
                Add to List
              </strong>
              {isSubmit ? <i className="fa fa-check"></i> : ""}
            </button>
          </div>
        </div>
      </div>
      <div>
        <hr className="divide" />
        <input
          className="filter"
          placeholder="Search for data"
          onChange={handleFilter}
        />
      </div>
      <br />

      <br />
      <div>
        <List data={data} />
      </div>
    </div>
  );
};

export default Form;
