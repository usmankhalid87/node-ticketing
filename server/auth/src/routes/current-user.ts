import { currentUser, requireAuth } from "@usmankhalid87/ticketing-shared";
import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
