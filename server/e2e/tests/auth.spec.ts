import { test, expect } from "@playwright/test";

test("Sign Up with valid inputs should return 201", async ({ request }) => {
  const email = "ukasdf@live.com";
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
