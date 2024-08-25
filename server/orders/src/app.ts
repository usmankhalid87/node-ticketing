import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@usmankhalid87/ticketing-shared";

const cookieParser = require("cookie-parser");

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieParser());
app.use(
  cookieSession({
    signed: false,
    //secure: process.env.NODE_ENV !== "test",
    secure: false,
  })
);

app.use(currentUser);
app.use(newOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
