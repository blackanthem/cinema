import express from "express";
import { router } from "./routes/routes";
import { authRouter } from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { join } from "path";

const app = express();

app.use(express.static(join(__dirname, "../client/build")));

app.use(express.json());
app.use("/v1", router);
app.use("/v1/auth", authRouter);

app.use(errorHandler);

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

export default app;
