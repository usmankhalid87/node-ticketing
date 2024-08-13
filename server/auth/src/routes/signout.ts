import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  req.session = null;
  res.status(StatusCodes.OK).send({});
});

export { router as signoutRouter };
