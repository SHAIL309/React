import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { ADD } from "../slice";
import Input from "../Inputs/input";
import Button from "../buttons/button";
import styles from "./NewExam.module.css";
import Questions from "../Questions/Questions";
import Header from "../header/header";
import Card from "../Card/card2 ";
import previous from "../images/back.png";

const NewExam = () => {
  const [isIdValid, setIdvalid] = useState(false);
  const [ismarks, setIsMarks] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [testid, setTestid] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [testName, setTestName] = useState("");
  const [instituteName, setInstitutename] = useState("");
  const [Totalmarks, setTotalMarks] = useState("");
  const [time, setTime] = useState("");
  const [isQuestion, setQuestion] = useState(false);
  const [Isformempty, setIsFormEmpty] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isFormEmpty =
      testid !== "" &&
      createdBy !== "" &&
      testName !== "" &&
      instituteName !== "" &&
      Totalmarks !== "" &&
      time !== "" &&
      ismarks &&
      isTime &&
     
      isIdValid;

    setIsFormEmpty(isFormEmpty);
  }, [
    testid,
    createdBy,
    testName,
    instituteName,
    Totalmarks,
    time,
    ismarks,
    isTime,
    
    isIdValid,
  ]);

  const addTest = (e) => {
    e.preventDefault();

    if (!testid || testid === "") {
      console.error("InvalTestid testid. Please provide  a non-empty testid.");
      return;
    }
    const TestData = {
      testid,
      createdBy,
      testName,
      instituteName,
      Totalmarks,
      time,
    };

    const examRef = ref(db, `Exams/${testid}`);
    set(examRef, {
      Testid: testid,
      CreatedBy: createdBy,
      TestName: testName,
      InstituteName: instituteName,
      Totalmarks: Totalmarks,
      Time: time,
    })
      .then(() => {
        dispatch(ADD(TestData));
        setIsFormEmpty(false);
        setTestid("");
        setTestName("");
        setInstitutename("");
        setTotalMarks("");
        setTime("");
        setCreatedBy("");

        console.log("Data added successfully");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  };

  useEffect(() => {
    const storedTestIds = JSON.parse(localStorage.getItem("Testid")) || [];
    if (storedTestIds.includes(testid)) {
      setIdvalid(false);
      // console.log(false);
    } else {
      setIdvalid(true);
      // console.log(true);
    }
  }, [testid]);

  useEffect(() => {
    if (Totalmarks === "" || Totalmarks < 30) {
      setIsMarks(false);
    } else {
      setIsMarks(true);
    }
  }, [Totalmarks, setIsMarks]);

  useEffect(() => {
    if (time === "" || time < 30) {
      setIsTime(false);
    } else {
      setIsTime(true);
    }
  }, [time, setTime]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsMarks(false);
    setIsTime(false);
    addTest(e);

    navigate("/ExamsList");
  };
  const addQuestions = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const closeAddmodal = () => {
    setQuestion(true);
  };

  return (
    <>
      <Header />
      <div className={styles.previous_button_div}>
        <Button
          name={<img src={previous} alt="Previous" width="25px" />}
          className={styles.previous_button}
          onClick={() => navigate("/ExamsList")}
        />
      </div>
      <div className={styles.main}>
        <Card>
          <div className={styles.formContainer}>
            <div>
              <h1>Add Test Details</h1>
            </div>
            <form>
              <div className={styles.row}>
                <div className={styles.marks}>
                  <Input
                  required={true}
                    label="Test Id"
                    type="text"
                    placeholder="testid"
                    handleChange={(e) => {
                      setTestid(e.target.value);
                    }}
                  />
                  {!isIdValid && (
                    <p style={{ color: "red", fontSize: "15px" }}>
                      Duplicate Id,Enter another Id
                    </p>
                  )}
                </div>
                <Input
                required={true}
                  label="Name of Test"
                  placeholder="Test Name"
                  handleChange={(e) => {
                    setTestName(e.target.value);
                  }}
                />
              </div>
              <div className={styles.row}>
                <Input
                required={true}
                  label="Name of Institute"
                  placeholder="Institute Name"
                  handleChange={(e) => {
                    setInstitutename(e.target.value);
                  }}
                />
                <Input
                required={true}
                  label="Who created the test"
                  placeholder="Created by"
                  handleChange={(e) => {
                    setCreatedBy(e.target.value);
                  }}
                />
              </div>
              <div className={styles.row}>
                <div className={styles.marks}>
                  <Input
                  required={true}
                    label="Total Marks of Test"
                    type="number"
                    placeholder="Marks"
                    handleChange={(e) => {
                      setTotalMarks(e.target.value);
                    }}
                  />
                  {!ismarks && (
                    <p style={{ color: "red", fontSize: "15px" }}>
                      Mininmum 30 Marks
                    </p>
                  )}
                </div>
                <div className={styles.time}>
                  <Input
                  required={true}
                    label=" Total Time of Test"
                    type="number"
                    handleChange={(e) => {
                      setTime(e.target.value);
                    }}
                    placeholder="Time"
                  />
                  {!isTime && (
                    <p style={{ color: "red", fontSize: "15px" }}>
                      Mininmum 30 Minutes
                    </p>
                  )}
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  name="Add questions"
                  className={styles.button}
                  disabled={!Isformempty}
                  onClick={addQuestions}
                />
                <Button
                  type="submit"
                  name="Add Test"
                  disabled={!(Isformempty&&isQuestion)}
                  className={styles.button}
                  onClick={handleSubmit}
                />
              </div>
            </form>
          </div>
        </Card>
        {showModal && (
          <div className={styles.overlay}>
            <Questions
              Testid={testid}
              Totalmarks={Totalmarks}
              closeAddmodal={closeAddmodal}
              closeModal={closeModal}
            />
          </div>
        )}
      </div>
      {/* <Questions/> */}
    </>
  );
};
export default NewExam;
