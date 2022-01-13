import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "../../pages/Layout/Layout";
import { login, logout } from "../../store/authSlice";
import { EditMovie } from "../EditMovie/EditMovie";
import { Movies } from "../Movies/Movies";

export function RequireAuth() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch("/v1/auth/user");
        if (!response.ok) throw response;
        dispatch(login());
      } catch (error) {
        dispatch(logout());
      }
    })();
  }, []);

  if (loggedIn === null) return null;

  if (loggedIn === false) return <Navigate to="/login"></Navigate>;

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/movies" element={<Movies />} />
        <Route path="/edit-movie" element={<EditMovie mode="update" />} />
        <Route path="/add-movie" element={<EditMovie mode="create" />} />
      </Route>
    </Routes>
  );
}
