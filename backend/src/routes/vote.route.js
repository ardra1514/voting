
import express from "express";

import {
  voteColor,
  getVotes
} from "../controllers/vote.controller.js";

import protect from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/vote", protect, voteColor);

route.get("/votes", getVotes);

export default route;