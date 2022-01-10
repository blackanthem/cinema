import express from "express";
import { router } from "./routes/routes";
import { authRouter } from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.static("./client/build"));
app.use(express.json());
app.use("/v1", router);
app.use("/v1/auth", authRouter);

app.use(errorHandler);

export default app;
