import * as async from "async";
import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import * as jwt from "jsonwebtoken";
import * as multer from "multer";
import { getConnection } from "typeorm";
import { Epizod } from "../entity/Epizod";
import { Musor } from "../entity/Musor";
import { YouTube } from "../entity/YouTube";

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  "15446227899-uo4u0njei3sf26b7r3qmu9hbqide94h3.apps.googleusercontent.com",
  "sW0B-dppq2AIl3tn0IxDwl9C",
  "http://localhost:3000/epizodok/video",
);

/**
 * GET /epizodok
 * Osszes epizod.
 */
export let getEpizod =  async (req: Request, res: Response, next: NextFunction) => {

    const epizodok = await Epizod.find();
    if (epizodok.length) {
        return res.json({ epizodok });
    } else {
        return res.json({ message: "Hiba tortent a epizodok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * GET /epizodok
 * Osszes epizod.
 */
export let getEpizodKereses =  async (req: Request, res: Response, next: NextFunction) => {

    const epizodok = await getConnection()
        .getRepository(Epizod)
        .createQueryBuilder("epizod")
        .where("epizod.cim like :kereses OR epizod.leiras like :kereses OR epizod.kulcsszavak like :kereses",
            {kereses: "%" + req.query.szoveg + "%" })
        .innerJoinAndSelect("epizod.musor", "musor")
        .getMany();

    if (epizodok.length) {
        return res.json({ epizodok });
    } else {
        return res.json({ message: "Hiba tortent a epizodok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * GET /epizodok/epizod
 * Egy epizod.
 */
export let getEpizodId =  async (req: Request, res: Response, next: NextFunction) => {

    const epizod = await Epizod.findOne(req.params.id);
    if (epizod.id) {
        return res.json({ epizod });
    } else {
        return res.json({ message: "Hiba tortent a epizod lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * POST /epizodok
 * Uj epizod letrehozasa.
 */
export let postEpizod =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const epizod = new Epizod();
    epizod.cim = req.body.cim;
    epizod.url = req.body.url;
    epizod.statusz = req.body.statusz;
    epizod.kiemelt = req.body.kiemelt;
    epizod.datum = req.body.datum;
    epizod.kep = req.body.kep;
    epizod.video = req.body.video;
    epizod.youtube = req.body.youtube;
    epizod.leiras = req.body.leiras;
    epizod.kulcsszavak = req.body.kulcsszavak;
    epizod.musor = req.body.musor;
    await epizod.save();

    if (epizod.id) {
        return res.json({ epizod });
    } else {
        return res.json({ message: "Hiba tortent a epizod letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * PUT /epizodok
 * Epizod modositasa.
 */
export let putEpizod =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const epizod = await Epizod.findOne(req.body.id);
    epizod.cim = req.body.cim;
    epizod.url = req.body.url;
    epizod.statusz = req.body.statusz;
    epizod.kiemelt = req.body.kiemelt;
    epizod.datum = req.body.datum;
    epizod.kep = req.body.kep;
    epizod.video = req.body.video;
    epizod.youtube = req.body.youtube;
    epizod.leiras = req.body.leiras;
    epizod.kulcsszavak = req.body.kulcsszavak;
    epizod.musor = await Musor.findOne(req.body.musor);
    await epizod.save();

    if (epizod.id) {
        return res.json({ epizod });
    } else {
        return res.json({ message: "Hiba tortent a epizod modositasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * DELETE /epizodok
 * Epizod torlese.
 */
export let deleteEpizod =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const epizod = await Epizod.findOne(req.params.id);
    await epizod.remove();

    if (!epizod.id) {
        return res.json({ epizod });
    } else {
        return res.json({ message: "Hiba tortent a epizod torlese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * POST /epizodok KEP
 * Epizod kep feltoltese.
 */
export let uploadVideo =  async (req: Request, res: Response, next: NextFunction) => {

    // set the directory for the uploads to the uploaded to
    const DIR = process.env.SERVER_VIDEOS_PATH;
    // tslint:disable-next-line:max-line-length
    // define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
    const upload = multer({dest: DIR}).single("video");

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

    const epizodok = await Epizod.find({ url: req.body.url });
    if (epizodok.length) {
        return res.json({ unique: false });
    } else {
        return res.json({ unique: true });
    }
};
