import express, { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError } from "@sgtickets/common";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function create(
  request: Request,
  response: Response
): Promise<void> {
  const { email, password } = request.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("Email in use");
  }

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  request.session = {
    jwt: userJwt,
  };

  response.status(StatusCodes.CREATED).send(user);
}
