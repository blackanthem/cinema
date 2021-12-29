import express from "express";
import movieModel from "./models/movie.model";

const app = express();

app.get("/", async (req, res) => {
  try {
    const movie = await movieModel.create({
      id: Math.floor(Math.random() * 200),
      title: "Hello",
    });
    res.send(movie);
  } catch (error) {
    console.error(error);

    res.send(error);
  }
});

export default app;
