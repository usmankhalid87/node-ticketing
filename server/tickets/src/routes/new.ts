import { requireAuth } from "@usmankhalid87/ticketing-shared";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post(
  "/api/tickets",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  requireAuth,
  (request: Request, response: Response) => {
    response.status(StatusCodes.CREATED).send();
  }
);

export { router as createTicketRouter };
