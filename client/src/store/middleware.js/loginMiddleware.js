import { logout } from "../authSlice";
import { toast } from "react-toastify";

export const loginMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action?.payload?.originalStatus === 401) {
      toast.error("Session expired", {});
      dispatch(logout());
    }

    return next(action);
  };
