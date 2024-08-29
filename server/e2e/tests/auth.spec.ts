import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Sign Up with valid inputs should return 201", async ({ request }) => {
  const email = faker.internet.email(); // Kassandra.Haley@erich.biz
  const apiResponse = await request.post("users/signup", {
    data: {
      email: email,
      password: "uk@1233",
    },
  });

  expect(apiResponse.status()).toBe(201);

  const responseBody = await apiResponse.json();

  expect(responseBody).toHaveProperty("email", email);
});
