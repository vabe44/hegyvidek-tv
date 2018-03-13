import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as multer from "multer";
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
        return res.json({ message: "Hiba tortent a musorok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * GET /musoraink/musor
 * Egy musor.
 */
export let getMusorId =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await Musor.findOneById(req.params.id);
    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba tortent a musor lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
export let postMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = new Musor();
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    await musor.save();

    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * PUT /musoraink
 * Musor modositasa.
 */
export let putMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await Musor.findOneById(req.body.id);
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    await musor.save();

    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba tortent a musor modositasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * DELETE /musoraink
 * Musor torlese.
 */
export let deleteMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await Musor.findOneById(req.params.id);
    await musor.remove();

    if (!musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba tortent a musor torlese kozben. Kerem probalja ujra kesobb." });
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
