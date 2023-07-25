import { onValue, ref } from "firebase/database";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import Button from "../buttons/button";
import styles from "./Questionslist.module.css";
import Input from "../Inputs/input";
import CrossIcon from "../buttons/crossIcon";
const QuestionList = ({ onClose, Testid }) => {
  const [Questions, setQuestions] = useState([]);
  const [testData, setTestData] = useState([]);
  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKeyPress);

    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [onClose]);
  useEffect(() => {
    const TestDataref = ref(db, `Exams`);
    onValue(TestDataref, (snapshot) => {
      const dataSnapShot = snapshot.val();
      if (dataSnapShot) {
        const TestArray = Object.entries(dataSnapShot).map((key) => ({
          id: key,
          ...dataSnapShot[key],
        }));

        const filteredTestData = TestArray.filter(
          (exam) => exam.id[1].Testid === Testid
        );
        setTestData(filteredTestData);
      } else {
        setTestData([]);
      }
    });
  }, [Testid]);

  useEffect(() => {
    const Questionsref = ref(db, `Questions`);
    onValue(Questionsref, (snapshot) => {
      const dataSnapShot = snapshot.val();
      if (dataSnapShot) {
        const QuestionArray = Object.entries(dataSnapShot).map((key) => ({
          id: key,
          ...dataSnapShot[key],
        }));
        const filteredQuestionData = QuestionArray.filter(
          (question) => question.id[1].Testid === Testid
        );
        setQuestions(filteredQuestionData);
      } else {
        setQuestions([]);
      }
    });
  }, [Testid]);
  return (
    <div className={styles.viewExam}>
      <div className={styles.viewExamHeader}>
        <h2> Exam Details</h2>
        <Button
          className={styles.closeButton}
          name={<CrossIcon />}
          onClick={onClose}
        />
      </div>
      <div className={styles.viewExamContent}>
        {testData.map((exam) => {
          const { Testid, TestName, InstituteName, Totalmarks, Time } =
            exam.id[1];
          return (
            <div key={exam.id} className={styles.testDetails}>
              <Input label="Test Id" value={Testid} readOnly={true} />
              <Input label="Test Name" value={TestName} readOnly={true} />
              <Input label="Institute Name" value={InstituteName} readOnly={true} />
              <Input label="Total Marks" value={Totalmarks} readOnly={true} />
              <Input label="Time" value={Time} readOnly={true} />
            </div>
          );
        })}
      </div>
      {Questions.length ? (
        <div>
          <table className={styles.Question_table}>
            <thead>
              <tr>
                <th className={styles.Question_header}>Question</th>
                <th className={styles.Question_header}>Option1</th>
                <th className={styles.Question_header}>Option2</th>
                <th className={styles.Question_header}>Option3</th>
                <th className={styles.Question_header}>Option4</th>
                <th className={styles.Question_header}>marks</th>
                <th className={styles.Question_header}>CorrectAnswer</th>
              </tr>
            </thead>
            <tbody>
              {Questions.map((question) => {
                // console.log("question", question);
                const {
                  Question,
                  Option1,
                  Option2,
                  Option3,
                  Option4,
                  marks,
                  CorrectAnswer,
                } = question.id[1];
                const truncatedQuesion =
                  Question.length > 30
                    ? Question.substring(0, 30) + "..."
                    : Question;
                return (
                  <tr key={question.id} className={styles.Question_row}>
                    <td className={styles.Question_data} title={Question}>
                      {truncatedQuesion}
                    </td>
                    <td className={styles.Question_data}>{Option1}</td>
                    <td className={styles.Question_data}>{Option2}</td>
                    <td className={styles.Question_data}>{Option3}</td>
                    <td className={styles.Question_data}>{Option4}</td>
                    <td className={styles.Question_data}>{marks}</td>
                    <td className={styles.Question_data}>{CorrectAnswer}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ color: "crimson" }}>
          No questions available for the selected test
        </div>
      )}
    </div>
  );
};
export default QuestionList;
