import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import WomenPage from "./Components/Pages/Image_page/WomenImg";
import ManPage from "./Components/Pages/Image_page/ManImg ";
import KidsPage from "./Components/Pages/Image_page/KidsImg ";
import BeautyPage from "./Components/Pages/Image_page/BeautyImg ";
import Navbar from "./Components/Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
// import PLX from "./Components/Pages/Image_page/plx";
function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Navigate to="/Women" replace />} />
          {/* <Route exact path="/" element={<PLX />} /> */}
          <Route exact path="/Women" element={<WomenPage />} />
          <Route exact path="/Man" element={<ManPage />} />
          <Route exact path="/Kids" element={<KidsPage />} />
          <Route exact path="/Beauty" element={<BeautyPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
