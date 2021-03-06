import { logout } from "../authSlice";

export const loginMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action?.meta?.arg?.endpointName === "login") return next(action);

    if (action?.payload?.originalStatus === 401) {
      dispatch(logout());
    }

    return next(action);
  };
