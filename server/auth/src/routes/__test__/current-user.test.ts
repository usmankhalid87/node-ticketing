import request from "supertest";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";

it("responds with details about the current user", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie!)
    .send()
    .expect(StatusCodes.OK);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(StatusCodes.UNAUTHORIZED);

  expect(response.body.currentUser).toBeUndefined();
});
