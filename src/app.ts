import express from "express";
import routes from "./routes";

const app = express();

app.use("/v1", routes);

export default app;
