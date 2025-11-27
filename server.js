import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect db
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// model
const Todo = mongoose.model("Todo", new mongoose.Schema({
  text: String
}));

// routes
app.get("/todos", async (req, res) => {
  res.json(await Todo.find());
});

app.post("/todos", async (req, res) => {
  const todo = await Todo.create({ text: req.body.text });
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
