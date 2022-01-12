import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../../pages/Layout/Layout";
import { EditMovie } from "../EditMovie/EditMovie";
import { Movies } from "../Movies/Movies";

export function RequireAuth() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  // if (!loggedIn) return <Navigate to="/login"></Navigate>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Movies />} />
        <Route path="/edit-movie" element={<EditMovie mode="update" />} />
        <Route path="/add-movie" element={<EditMovie mode="create" />} />
      </Route>
    </Routes>
  );
}
