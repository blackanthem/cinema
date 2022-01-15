import { Outlet } from "react-router-dom";
import "./App.scss";
import NavBar from "../components/NavBar/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getWindowSize } from "../store/breakpointSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.onload = window.onresize = () => {
      dispatch(getWindowSize());
    };
  }, []);

  return (
    <div className="App">
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
