import { signupRouter } from "./routes/signup";
import express from "express";
// import { json } from "body-parser";
// import { NotFoundError } from "@sgtickets/common";
// import cookieSession from "cookie-session";

const app = express();

// app.set("trust proxy", true);
// app.use(json());

// app.use(
//   cookieSession({
//     signed: false,
//     // secure: process.env.NODE_ENV !== 'test',
//     secure: false,
//   })
// );

// app.all("*", async (req, res) => {
//   throw new NotFoundError();
// });

// app.routes(signupRouter);

app.listen(4001, () => {
  console.log("Auth server listening at 4001");
});
