import request from "supertest";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";

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

  it("returns a status other than 401 if the user is signed in", async () => {
    const cookie = global.signin();
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({});

    expect(response.status).not.toEqual(StatusCodes.UNAUTHORIZED);
  });
});
