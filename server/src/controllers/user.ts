import * as async from "async";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
import * as passport from "passport";
import { LocalStrategyInfo } from "passport-local";
import { User } from "../entity/User";
// const request = require("express-validator");

/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/login", {
    title: "Login",
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
export let postLogin = async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.json({ errors });
  }

  const user = await User.findOne({ email: req.body.email });

  if ( !user ) {
    return res.json({message: "Ez a felhasználó nem található."});
  }

  if (bcrypt.compareSync(req.body.password, user.password)) {
    // from now on we'll identify the user by the id
    // the id is the only personalized value that goes into our token
    const payload = {
      email: user.email,
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({ message: "ok", token });
  } else {
    return res.json({message: "Helytelen jelszó."});
  }
};

/**
 * GET /logout
 * Log out.
 */
export let logout = (req: Request, res: Response) => {
  req.logout();
  res.redirect("/");
};

/**
 * GET /signup
 * Signup page.
 */
export let getSignup = (req: Request, res: Response) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("account/signup", {
    title: "Create Account",
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
export let postSignup =  async (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
  req.assert("password", "Password must be at least 4 characters long").len({ min: 4 });
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);
  req.assert("username", "Username must be at least 4 characters long").len({ min: 4 });

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.json({ errors });
  }

  const user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = user.hashPassword(req.body.password);

  const alreadyRegistered = await User.findOne({ email: req.body.email });
  if (alreadyRegistered) {
    req.flash("errors", { msg: "Account with that email address already exists." });
    return res.json({ message: "Account with that email address already exists." });
  }
  await user.save();

  if (user.id) {
    const payload = {
      email: user.email,
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({ message: "ok", token });
  } else {
    return res.json({ message: "error" });
  }
};
