import styles from "./Body.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Books from "./pages/Books/Books";
import Dashboard from "./pages/Dashboard/Dashboard";
import Student from "./pages/Student/Student";
import Settings from "./pages/Settings/Settings";
import NetworkError from "../common/networkerror";
import StudentDetails from "./pages/Student/IndividualStudent/StudentDetails";
import IssueBook from "./pages/IssueBooks/Issued";
import { AnimatePresence } from "framer-motion";

export default function Body() {
  const location = useLocation();
  return (
    <>
      <div className={styles.container}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Books" element={<Books />}></Route>
            <Route path="/Students" element={<Student />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/issue" element={<IssueBook />}></Route>
            <Route path="/Student/:id" element={<StudentDetails />}></Route>
            <Route path="/error" element={<NetworkError />}></Route>
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}
