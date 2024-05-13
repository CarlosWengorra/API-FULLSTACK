import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./Routes/auth.routes.js";
import taksRoutes from "./Routes/tasks.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);

if (process.env.NODE_ENV === "production") {
  import("path").then((path) => {
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
      console.log(path.resolve("client", "dist", "index.html"));
      res.sendFile(path.resolve("client", "dist", "index.html"));
    });
  }).catch((err) => {
    console.error("Error al cargar el módulo 'path':", err);
  });
}

export default app;
