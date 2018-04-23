import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as multer from "multer";
import { getConnection } from "typeorm";
import { Musor } from "../entity/Musor";

/**
 * GET /musoraink
 * Osszes musor.
 */
export let getMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musorok = await Musor.find();
    if (musorok.length) {
        return res.json({ musorok });
    } else {
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
export let getAktivMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musorok = await Musor.find({ statusz: "aktív" });
    if (musorok.length) {
        return res.json({ musorok });
    } else {
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
export let getHirek =  async (req: Request, res: Response, next: NextFunction) => {

    const musorok = await Musor.find({ cim: "Hírek" });
    if (musorok.length) {
        return res.json({ musorok });
    } else {
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /musoraink/musor
 * Egy musor.
 */
export let getMusorId =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await Musor.findOne(req.params.id);
    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba történt a műsor lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
export let getMusorUrl =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await getConnection()
        .getRepository(Musor)
        .createQueryBuilder("musor")
        .where("musor.url = :url", { url: req.params.musorUrl })
        .innerJoinAndSelect("musor.epizodok", "epizodok")
        .orderBy("musor.createdDate", "DESC")
        .getOne();

    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba történt a műsor lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
export let postMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musor = new Musor();
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    await musor.save();

    if (musor.id) {
        return res.json({ musor, message: "A műsor létrehozása sikeres." });
    } else {
        return res.json({ message: "Hiba történt a műsor létrehozása közben. Kérem próbálja újra később." });
    }
};

/**
 * PUT /musoraink
 * Musor modositasa.
 */
export let putMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musor = await Musor.findOne(req.body.id);
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    await musor.save();

    if (musor.id) {
        return res.json({ musor, message: "A műsor módosítása sikeres." });
    } else {
        return res.json({ message: "Hiba törtent a műsor módosítása közben. Kérem próbalja újra később." });
    }
};

/**
 * DELETE /musoraink
 * Musor torlese.
 */
export let deleteMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musor = await Musor.findOne(req.params.id);
    await musor.remove();

    if (!musor.id) {
        return res.json({ musor, message: "A műsor törlése sikeres." });
    } else {
        return res.json({ message: "Hiba történt a műsor törlése közben. Kérem próbálja újra később." });
    }
};

/**
 * POST /musoraink KEP
 * Musor kep feltoltese.
 */
export let uploadPicture =  async (req: Request, res: Response, next: NextFunction) => {

    // set the directory for the uploads to the uploaded to
    const DIR = process.env.SERVER_IMAGES_PATH;
    // tslint:disable-next-line:max-line-length
    // define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
    const upload = multer({dest: DIR}).single("photo");

    upload(req, res, (err: any) => {
        if (err) {
            // An error occurred when uploading
            // tslint:disable-next-line:no-console
            console.log(err);
            return res.status(422).send("an Error occured");
        }
        // No error occured.
        const file = req.file;
        return res.json({ file });
    });
};

/**
 * GET /musoraink
 * Osszes musor.
 */
export let checkUrl =  async (req: Request, res: Response, next: NextFunction) => {

    const musorok = await Musor.find({ url: req.body.url });
    if (musorok.length) {
        return res.json({ unique: false });
    } else {
        return res.json({ unique: true });
    }
};
