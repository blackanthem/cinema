import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import BuyTicket from "./pages/BuyTicket/BuyTicket";
import EmployeeLogin from "./pages/EmployeeLogin/EmployeeLogin";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { Four0Four } from "./pages/404/404";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movie/:id/buy-ticket" element={<BuyTicket />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="auth/*" element={<RequireAuth />} />
            <Route path="*" element={<Four0Four />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
