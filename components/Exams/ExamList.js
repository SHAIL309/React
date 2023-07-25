import { useNavigate } from "react-router";
import { ref, remove } from "firebase/database";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE, fetchTest } from "../slice";
import nodata from "../images//noData.svg";
import QuestionList from "../Questions/QuestionsList";
import Button from "../buttons/button";
import Styles from "./ExamList.module.css";
import Header from "../header/header";
import deleteIcon from "../images/delete.png";
import viewIcon from "../images/view.png";
import NewTest from "../images/NewTest.png";
const ExamsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.tests);
  // console.log('tests', tests)
  const status = useSelector((state) => state.status);
  const [selectedTestid, setSelectedTestid] = useState("");
  const [selectedExam, setSelectedExam] = useState(false);

  useEffect(() => {
    dispatch(fetchTest());
  }, [dispatch]);
  const testIds = tests.map((test) => test.Testid);
  let ids = JSON.stringify(testIds);
  localStorage.setItem("Testid", ids);
  const handleClick = () => {
    navigate("/AddExam");
  };
  const handleCloseView = () => {
    setSelectedExam(false);
  };
  const ViewTest = (Testid) => {
    setSelectedExam(true);
    setSelectedTestid(Testid);
  };

  const DeleteTest = (Testid) => {
    remove(ref(db, `Exams/${Testid}`))
      .then(() => {
        console.log("Exam Data Deleted Succesfully");

        dispatch(DELETE(Testid));
      })
      .catch((error) => {
        console.log("Error", error);
      });
    remove(ref(db, `Questions/${Testid}`))
      .then(() => {
        console.log("Removed Question of test:", Testid);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Header />
      <div className={Styles.content}>
        <div className={Styles.newtest_div}>
          <Button
            name={<img src={NewTest} alt="Add New Test" width="25px" />}
            onClick={handleClick}
            className={Styles.button_newTest}
          />
        </div>

        <div>
          {(status === "Recived" && tests.length) || status === "Loading" ? (
            <div className={Styles.test_div}>
              <div className={Styles.header}>
                <h1>List of Tests</h1>
              </div>

              {status === "Loading" ? (
                <div className={Styles.loader}>Loading...</div>
              ) : (
                <table className={Styles.Test_table}>
                  <thead>
                    <tr>
                      <th className={Styles.Test_header}> Test Id</th>
                      <th className={Styles.Test_header}>Test Name</th>
                      <th className={Styles.Test_header}>Institute Name</th>
                      <th className={Styles.Test_header}>Total marks</th>
                      <th className={Styles.Test_header}>Time</th>
                      <th className={Styles.Test_header}> Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tests.map((test) => {
                      return (
                        <tr key={test.Testid} className={Styles.Test_row}>
                          <td className={Styles.Test_data}>{test.Testid}</td>
                          <td className={Styles.Test_data}>{test.TestName}</td>
                          <td className={Styles.Test_data}>
                            {test.InstituteName}
                          </td>
                          <td className={Styles.Test_data}>
                            {test.Totalmarks}
                          </td>
                          <td className={Styles.Test_data}>{test.Time}</td>

                          <td className={Styles.Test_data}>
                            <div className={Styles.action}>
                              <Button
                                className={Styles.button}
                                name={
                                  <img src={viewIcon} alt="VIEW" width="25px" />
                                }
                                onClick={() => ViewTest(test.Testid)}
                              />
                              <Button
                                className={Styles.button}
                                name={
                                  <img
                                    src={deleteIcon}
                                    alt="DELETE"
                                    width="25px"
                                  />
                                }
                                onClick={() => DeleteTest(test.Testid)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className={Styles.empty_window}>
              <h1>No Test Data Available </h1>
              <img src={nodata} alt="No data Found" />
            </div>
          )}
        </div>
      </div>
      {selectedExam && (
        <div className={Styles.overlay}>
          <QuestionList Testid={selectedTestid} onClose={handleCloseView} />
        </div>
      )}
    </>
  );
};
export default ExamsList;
