import { NextFunction, Request, Response } from "express";
import * as nodemailer from "nodemailer";
import { Gmail } from "../entity/Gmail";

/**
 * GET /contact
 * Contact form page.
 */
export let getContact = (req: Request, res: Response) => {
  res.render("contact", {
    title: "Contact",
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
export let postContact = async (req: Request, res: Response) => {
  req.assert("level", "Message cannot be blank").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/contact");
  }

  const gmail = await Gmail.findOne();

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
};

/**
 * PUT /hirek
 * Hir modositasa.
 */
export let putGmail =  async (req: Request, res: Response, next: NextFunction) => {

  const gmail = await Gmail.findOne();
  gmail.user = req.body.user;
  gmail.pass = req.body.pass;
  await gmail.save();

  if (gmail.id) {
    return res.json({ gmail, message: "Az adatok módosítása sikeres." });
  } else {
    return res.json({ message: "Hiba történt az adatok módosítása közben. Kérem próbálja újra később." });
  }
};

/**
 * GET /contact
 * Contact form page.
 */
export let getGmailCredentials = async (req: Request, res: Response) => {

  const gmail = await Gmail.findOne();

  if (gmail.id) {
      return res.json({ gmail });
  } else {
      return res.json({ message: "Hiba történt az adatok lekérdezése közben. Kérem próbálja újra később." });
  }

};
