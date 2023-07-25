import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ExamsList from "./components/Exams/ExamList";
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import NewExam from "./components/Exams/NewExam";

function App() {
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken"));
  const location = useLocation();

  useEffect(() => {
    setIdToken(localStorage.getItem("idToken"));
  }, [location.pathname]);
  useEffect(() => {
    if (!idToken) {
      setIdToken(null);
      localStorage.removeItem("idToken");
      localStorage.removeItem("userName");
    }
  }, [idToken]);
  const isLoggedIn = !!idToken;

  return (
    <div className="App">
      <Routes>
        <Route exact path="/signup" element={<Signup />} />

        {isLoggedIn ? (
          <>
            <Route exact path="/ExamsList" element={<ExamsList />} />
            <Route exact path="/AddExam" element={<NewExam />} />
            <Route path="*" element={<Navigate to="/ExamsList" replace />} />
          </>
        ) : (
          <>
            <Route exact path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
