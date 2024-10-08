import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@usmankhalid87/ticketing-shared";
import { Ticket } from "../models/ticket";
import { StatusCodes } from "http-status-codes";
import { rabbitMQWrapper } from "../rmq-wrapper";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await new TicketCreatedPublisher(rabbitMQWrapper.channel).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    await ticket.save();

    res.status(StatusCodes.CREATED).send(ticket);
  }
);

export { router as createTicketRouter };
