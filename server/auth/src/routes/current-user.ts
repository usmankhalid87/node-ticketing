import express from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "@sgtickets/common/build/middlewares/require-auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
