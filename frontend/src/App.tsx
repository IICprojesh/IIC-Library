import Sidebar from "./Components/Nav/Sidebar";
import Body from "./Components/Body/Body";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CODE_NETWORK_ERROR } from "./constants/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";

function App() {
  const navigate = useNavigate();
  const { error } = useFetch("");
  useEffect(() => {
    if ((error as any)?.code === CODE_NETWORK_ERROR) navigate("/error");
  }, [error, navigate]);
  return (
    <>
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
      <div className="App">
        <Sidebar />
        <Body />
      </div>
    </>
  );
}

export default App;
