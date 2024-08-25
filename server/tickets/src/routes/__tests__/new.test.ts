import request from "supertest";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";
import { Ticket } from "../../models/ticket";
import { rabbitMQWrapper } from "../../rmq-wrapper";

describe("New route tests for ticketing services", () => {
  it("has a route handler listening to /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(StatusCodes.NOT_FOUND);
  });

  it("should throw UNAUTHORIZED(401) if the user is not signed in", async () => {
    await request(app)
      .post("/api/tickets")
      .send({})
      .expect(StatusCodes.UNAUTHORIZED);
  });

  it("returns a status other than UNAUTHORIZED(401) if the user is signed in", async () => {
    const cookie = global.signin();

    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send();

    expect(response.status).not.toEqual(StatusCodes.UNAUTHORIZED);
  });

  it("creates a ticket with valid inputs", async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "asldkfj";

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({
        title,
        price: 20,
      })
      .expect(201);

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
    expect(rabbitMQWrapper.channel.publish).toHaveBeenCalled();
  });
});
