import express from "express";
import userRouter from "./routes/user.router.js";
import adminRouter from "./routes/admin.router.js";
import cors from "cors";
import { auth } from "./middlewares/auth.middleware.js";
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/admin", auth, adminRouter);

app.listen(port, () => {
  console.log("server is running on 3000");
});
