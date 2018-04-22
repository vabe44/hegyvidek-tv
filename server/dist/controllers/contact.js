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
const nodemailer = require("nodemailer");
const Gmail_1 = require("../entity/Gmail");
/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
    res.render("contact", {
        title: "Contact",
    });
};
/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => __awaiter(this, void 0, void 0, function* () {
    req.assert("level", "Message cannot be blank").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
        req.flash("errors", errors);
        return res.redirect("/contact");
    }
    const gmail = yield Gmail_1.Gmail.findOne();
    const transporter = nodemailer.createTransport({
        auth: {
            user: gmail.user,
            // tslint:disable-next-line:object-literal-sort-keys
            pass: gmail.pass,
        },
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
    });
    const mailOptions = {
        from: `${req.body.nev} <${req.body.email}>`,
        subject: `[Hegyvidék TV] ${req.body.targy}`,
        text: req.body.level,
        to: gmail.sendTo,
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            req.flash("errors", { msg: err.message });
            // tslint:disable-next-line:max-line-length
            return res.json({ sent: false, message: "Hiba történt az üzenet küldése közben. Kérem próbálja újra később. " + err.message });
        }
        return res.json({ sent: true, message: "Az üzenet küldése sikeres." });
    });
});
/**
 * PUT /hirek
 * Hir modositasa.
 */
exports.putGmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const gmail = yield Gmail_1.Gmail.findOne();
    gmail.user = req.body.user;
    gmail.pass = req.body.pass;
    yield gmail.save();
    if (gmail.id) {
        return res.json({ gmail, message: "Az adatok módosítása sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt az adatok módosítása közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /contact
 * Contact form page.
 */
exports.getGmailCredentials = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const gmail = yield Gmail_1.Gmail.findOne();
    if (gmail.id) {
        return res.json({ gmail });
    }
    else {
        return res.json({ message: "Hiba történt az adatok lekérdezése közben. Kérem próbálja újra később." });
    }
});
//# sourceMappingURL=contact.js.map