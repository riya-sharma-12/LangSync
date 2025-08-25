import express from "express";
import { login, logout, onboard, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
// router.post(path, [middleware1, middleware2, ...], handler);
// here middleware part is optional thatswhy it is in onboarding
// route but not in signup/login/logout route
router.post("/signup", signup);
router.post("/login", login);

// we kept logout also as a post method because
// it is changing the server state although we could 
// use get method but using post method is recommended
router.post("/logout", logout);

// thit protectRoute middleware will be for verifying if 
// user has login or not if user has not loggen in he cant
// onboard for language training
// for verifying user will send their jwt token
// and we will verify if that token exist in cookie
// if yes then user has logged in becuase if u remember
// we were saving the jwt token in cookie while user signup 
// and loggin

// thid protectRoute we are creating in auth.middleware.js
router.post("/onboarding", protectRoute, onboard);

// check if user is logged in
router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;