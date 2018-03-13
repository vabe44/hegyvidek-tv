import * as async from "async";
import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import * as multer from "multer";
import { Epizod } from "../entity/Epizod";
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
 * GET /epizodok/epizod
 * Egy epizod.
 */
export let getEpizodId =  async (req: Request, res: Response, next: NextFunction) => {

    const epizod = await Epizod.findOneById(req.params.id);
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

    const epizod = await Epizod.findOneById(req.body.id);
    epizod.cim = req.body.cim;
    epizod.url = req.body.url;
    epizod.statusz = req.body.statusz;
    epizod.kiemelt = req.body.kiemelt;
    epizod.datum = req.body.datum;
    epizod.kep = req.body.kep;
    epizod.video = req.body.video;
    epizod.youtube = req.body.youtube;
    epizod.leiras = req.body.leiras;
    epizod.musor = req.body.musor;
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

    const epizod = await Epizod.findOneById(req.params.id);
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
