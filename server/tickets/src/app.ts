import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@usmankhalid87/ticketing-shared";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";
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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
