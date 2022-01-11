import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Counter } from "../Counter/Counter";

export function RequireAuth() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  if (!loggedIn) return <Navigate to="/login"></Navigate>;

  return (
    <Routes>
      <Route path="/" element={<Counter />} />
    </Routes>
  );
}
