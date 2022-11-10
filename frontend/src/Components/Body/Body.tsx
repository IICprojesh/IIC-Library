import styles from "./Body.module.css";
import { Routes, Route } from "react-router-dom";
import Books from "./pages/Books/Books";
import Dashboard from "./pages/Dashboard/Dashboard";
import Student from "./pages/Student/Student";
import Settings from "./pages/Settings/Settings";
import NetworkError from '../common/networkerror';

export default function Body() {
  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/Books" element={<Books />}></Route>
          <Route path="/Students" element={<Student />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route
            path="/error"
            element={<NetworkError/>}
          ></Route>
        </Routes>
      </div>
    </>
  );
}
