import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as multer from "multer";
import { getConnection } from "typeorm";
import { Banner } from "../entity/Banner";

/**
 * GET /bannerek
 * Osszes banner.
 */
export let getBannerek =  async (req: Request, res: Response, next: NextFunction) => {

    const bannerek = await getConnection()
        .getRepository(Banner)
        .createQueryBuilder("banner")
        .orderBy("banner.createdDate", "DESC")
        .getMany();
    if (bannerek.length) {
        return res.json({ bannerek });
    } else {
        return res.json({ message: "Hiba történt a bannerek lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /bannerek/banner
 * Egy banner.
 */
export let getBannerId =  async (req: Request, res: Response, next: NextFunction) => {

    const banner = await Banner.findOne(req.params.id);
    if (banner.id) {
        return res.json({ banner });
    } else {
        return res.json({ message: "Hiba történt a banner lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /epizodok
 * Osszes epizod.
 */
export let getErvenyesBannerek =  async (req: Request, res: Response, next: NextFunction) => {

    const bannerek = await getConnection()
        .getRepository(Banner)
        .createQueryBuilder("banner")
        .where("NOW() >= banner.aktivEttol AND NOW() <= banner.aktivEddig AND banner.statusz like 'aktív'")
        .getMany();

    if (bannerek.length) {
        return res.json({ bannerek });
    } else {
        return res.json({ message: "Hiba történt az bannerek lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * POST /bannerek
 * Uj banner letrehozasa.
 */
export let postBanner =  async (req: Request, res: Response, next: NextFunction) => {

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

    const banner = new Banner();
    banner.nev = req.body.nev;
    banner.aktivEttol = req.body.aktivEttol;
    banner.aktivEddig = req.body.aktivEddig;
    banner.statusz = req.body.statusz;
    banner.tipus = req.body.tipus;
    banner.kep = req.body.kep;
    banner.keplink = req.body.keplink;
    banner.embedkod = req.body.embedkod;
    banner.pozicio = req.body.pozicio;
    await banner.save();

    // tslint:disable-next-line:no-console
    console.log(req.body);

    if (banner.id) {
        return res.json({ banner, message: "A banner létrehozása sikeres." });
    } else {
        return res.json({ message: "Hiba történt a banner létrehozása közben. Kérem próbálja újra később." });
    }
};

/**
 * PUT /bannerek
 * Banner modositasa.
 */
export let putBanner =  async (req: Request, res: Response, next: NextFunction) => {

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

    const banner = await Banner.findOne(req.body.id);
    banner.nev = req.body.nev;
    banner.aktivEttol = req.body.aktivEttol;
    banner.aktivEddig = req.body.aktivEddig;
    banner.statusz = req.body.statusz;
    banner.tipus = req.body.tipus;
    banner.kep = req.body.kep;
    banner.keplink = req.body.keplink;
    banner.embedkod = req.body.embedkod;
    banner.pozicio = req.body.pozicio;
    await banner.save();

    if (banner.id) {
        return res.json({ banner, message: "A banner módosítása sikeres." });
    } else {
        return res.json({ message: "Hiba történt a banner módosítása közben. Kérem próbálja újra később." });
    }
};

/**
 * DELETE /bannerek
 * Banner torlese.
 */
export let deleteBanner =  async (req: Request, res: Response, next: NextFunction) => {

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

    const banner = await Banner.findOne(req.params.id);
    await banner.remove();

    if (!banner.id) {
        return res.json({ banner, message: "A banner törlése sikeres." });
    } else {
        return res.json({ message: "Hiba történt a banner törlése közben. Kérem próbálja újra később." });
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
