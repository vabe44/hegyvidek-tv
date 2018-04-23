"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User_1 = require("../entity/User");
// const request = require("express-validator");
/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
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
exports.postLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.json({ errors });
    }
    const user = yield User_1.User.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ message: "Ez a felhasználó nem található." });
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
    }
    else {
        return res.json({ message: "Helytelen jelszó." });
    }
});
/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    res.redirect("/");
};
/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
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
exports.postSignup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const user = new User_1.User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = user.hashPassword(req.body.password);
    const alreadyRegistered = yield User_1.User.findOne({ email: req.body.email });
    if (alreadyRegistered) {
        req.flash("errors", { msg: "Account with that email address already exists." });
        return res.json({ message: "Account with that email address already exists." });
    }
    yield user.save();
    if (user.id) {
        const payload = {
            email: user.email,
            id: user.id,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.json({ message: "ok", token });
    }
    else {
        return res.json({ message: "error" });
    }
});
//# sourceMappingURL=user.js.map