
import "./config/env.config";
import cors from "cors";
import express from "express";
import type { Request, Response } from "express";
import formRoutes from "./routes/form.routes";
import authRoutes from "./routes/auth.routes";
import connectDB from "./config/db.config";


const app = express();
const PORT = Number(process.env.PORT) || 5000;
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true
  })
);
app.use(express.json());
app.use("/api/forms", formRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (_req: Request, res: Response) => {
  res.send("Backend is running");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});