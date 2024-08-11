import express, { Request, Response, Router } from "express";
import { create } from "../controllers/auth-controller";

const router: Router = express.Router();
router.post("api/users/signup", create);

export { router as signupRouter };
