import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    if (!process.env.JWT_KEY) {
      throw new BadRequestError("Key is not defined!");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    //generate web token
    const token = jwt.sign(
      { id: user.id, password: user.password },
      process.env.JWT_KEY!
    );

    //Save jwt into session
    req.session = {
      jwt: token,
    };

    res.status(StatusCodes.CREATED).send(user);
  }
);

export { router as signupRouter };
