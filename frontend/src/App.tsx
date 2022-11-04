import React from "react";
import Sidebar from "./Components/Nav/Sidebar";
import Body from "./Components/Body/Body";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App" style={{ display: "flex" }}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar />
      <Body />
    </div>
  );
}

export default App;
