import express from "express";
import healthRouter from "./routes/health.route.js";
import authRouter from "./routes/auth.route.js";
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api", healthRouter);
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
