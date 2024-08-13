import express, { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError } from "@sgtickets/common";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export async function create(request: Request, response: Response) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(StatusCodes.BAD_REQUEST).send(errors.array);
  }

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
