import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onValue, ref, set } from "firebase/database";
import { useFormik, validateYupSchema } from "formik";
import Input from "../Inputs/input";
import Button from "../buttons/button";
import styles from "./Question.module.css";
import CrossIcon from "../buttons/crossIcon";
import * as yup from "yup";
import Textarea from "../Inputs/textArea";
import uuid from "react-uuid";

const Questions = ({ closeModal, closeAddmodal, Testid, Totalmarks }) => {
  let questionid = uuid();
  // const [question, setQuestion] = useState("");
  // const [option1, setoption1] = useState("");
  // const [option2, setoption2] = useState("");
  // const [option3, setoption3] = useState("");
  // const [option4, setoption4] = useState("");
  // const [marks, setMarks] = useState("");
  // const [correctAnswer, setCorrectAnswer] = useState("");
  const [Questions, setQuestions] = useState([]);
  const [accumulatedMarks, setAccumulatedMarks] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const QuestioSchema = yup.object().shape({
    question:yup.string().required("This is required field"),
   option1:yup.string().required("This is required field"),
   option2:yup.string().required("This is required field"),
   option3:yup.string().required("This is required field"),
   option4:yup.string().required("This is required field"),
   marks:yup.number().required("This is Required field"),
   correctAnswer:yup.string().required("This is required field")
  })
   const{values,handleChange,handleSubmit,errors} = useFormik({
   initialValues:{
   question:"",
  option1:"",
  option2:"",
  option3:"",
  option4:"",
  marks:"",
  correctAnswer:"" 
  },
  validationSchema:QuestioSchema,
  onSubmit:handleSubmit

 })
 
  const checkInputs = () => {
    if (
      question.trim() !== "" &&
      option1.trim() !== "" &&
      option2.trim() !== "" &&
      option3.trim() !== "" &&
      option4.trim() !== "" &&
      marks.trim() !== "" &&
      correctAnswer.trim() !== "" &&
      Totalmarks !== accumulatedMarks
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  useEffect(() => {
    checkInputs(); // eslint-disable-next-line
  }, [question, option1, option2, option3, option4, marks, correctAnswer]);

  const addQuestion = (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const Question = {
      Testid,
      question,
      option1,
      option2,
      option3,
      option4,
      marks,
      correctAnswer,
    };
    const QuestionRef = ref(db, `Questions/${questionid}`);
    set(QuestionRef, {
      Testid: Testid,
      Question: question + " ?",
      Option1: option1,
      Option2: option2,
      Option3: option3,
      Option4: option4,
      marks: marks,
      CorrectAnswer: correctAnswer,
    })
      .then(() => {
        console.log("Document written with ID: ", Testid);
        // Fetch the updated list of questions
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
    const currentMarks = parseInt(marks, 10);
    const updatedAccumulatedMarks = accumulatedMarks + currentMarks;
    setAccumulatedMarks(updatedAccumulatedMarks);
  };
  const handleContinue = () => {
    // if (
    //   !(
    //     Totalmarks - accumulatedMarks === 0 || Totalmarks - accumulatedMarks < 0
    //   )
    // ) {
    // }
  };
  const handleAddQuestion = (e) => {
    closeAddmodal();
    setIsButtonDisabled(true);
    addQuestion(e);
    setQuestion("");
    setoption1("");
    setoption2("");
    setoption3("");
    setoption4("");
    setMarks("");
    setCorrectAnswer("");
    setIsButtonDisabled(true);
    checkInputs();
  };

  const handleClose = () => {
    closeModal();
  };

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
    <div className={styles.modal}>
      <div>
        <Button
          name={<CrossIcon />}
          className={styles.close}
          onClick={handleClose}
          disabled={
            !(
              Totalmarks - accumulatedMarks === 0 ||
              Totalmarks - accumulatedMarks < 0
            )
          }
        />
      </div>
      <div className={styles.titleBar}>
        <h1 className={styles.title}>Add Question</h1>
        <div className={styles.marks}>
          <label className={styles.label}>Remaining Marks:</label>
          <span className={styles.accumulatedMarks}>
            {Totalmarks - accumulatedMarks}
          </span>
        </div>
      </div>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div style={{ width: "100%" }}>
            <Textarea
              name="Questions"
              id="Questions"
              label="Questions"
              required={true}
              handleChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.question? styles.error:""}
              // error={formik.errors.question}
              // touched={formik.touched.question}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              name="Option 1"
              id="Option 1"
              label="Option 1"
              required={true}
              handleChange={(e) => setoption1(e.target.value)}
              placeholder="Option 1"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.option1? styles.error:""}
              // error={formik.errors.option1}
              // touched={formik.touched.option1}
            />
            <Input
              name="Option 2"
              id="Option 2"
              label="Option 2"
              required={true}
              handleChange={(e) => setoption2(e.target.value)}
              placeholder="Option 2"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.option2? styles.error:""}
              // error={formik.errors.option2}
              // touched={formik.touched.option2}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              name="Option 3"
              id="Option 3"
              label="Option 3"
              required={true}
              handleChange={(e) => setoption3(e.target.value)}
              placeholder="Option 3"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.option3? styles.error:""}
              // error={formik.errors.option3}
              // touched={formik.touched.option3}
            />

            <Input
              name="Option 4"
              id="Option 4"
              label="Option 4"
              required={true}
              handleChange={(e) => setoption4(e.target.value)}
              placeholder="Option 4"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.option4? styles.error:""}
              // error={formik.errors.option4}
              // touched={formik.touched.option4}
            />
          </div>
          <div className={styles.inputGroup}>
            <Input
              name="marks"
              id="marks"
              label="Marks"
              required={true}
              type="number"
              handleChange={(e) => setMarks(e.target.value)}
              placeholder="marks"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              className={errors.marl? styles.error:""}
              // error={formik.errors.marks}
              // touched={formik.touched.marks}
            />

            <Input
              name="correct Answer"
              id="correct Answer"
              label="correct Answer"
              required={true}
              handleChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Correct Answer"
              disabled={
                Totalmarks - accumulatedMarks === 0 ||
                Totalmarks - accumulatedMarks < 0
              }
              // error={formik.errors.correctAnswer}
              // touched={formik.touched.correctAnswer}
            />
          </div>
          <Button
            type="submit"
            name="Add Question"
            className={styles.button}
            onClick={handleAddQuestion}
            disabled={isButtonDisabled}
          />
        </form>
      </div>

      <div>
        {Questions.length && (
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
        )}
      </div>
      <div className={styles.Continue}>
        <Button
          name="Continue"
          className={styles.next}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
};

export default Questions;
