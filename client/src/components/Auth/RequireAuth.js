import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../../pages/Layout/Layout";
import { Movies } from "../Movies/Movies";

export function RequireAuth() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  // if (!loggedIn) return <Navigate to="/login"></Navigate>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Movies />} />
      </Route>
    </Routes>
  );
}
