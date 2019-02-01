import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as multer from "multer";
import { getConnection } from "typeorm";
import { Mediaajanlat } from "../entity/Mediaajanlat";

/**
 * GET /bannerek
 * Osszes banner.
 */
export let getMediaajanlat =  async (req: Request, res: Response, next: NextFunction) => {

    const mediaajanlat = await getConnection()
        .getRepository(Mediaajanlat)
        .createQueryBuilder("mediajanlat")
        .orderBy("mediajanlat.id", "DESC")
        .getMany();
    if (mediaajanlat.length) {
        return res.json({mediaajanlat: mediaajanlat[0].szoveg});
    } else {
        return res.json({ message: "Hiba történt a médiaajánlat lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * PUT /mediaajanlat
 * Mediaajanlat modositasa.
 */
export let putMediaajanlat =  async (req: Request, res: Response, next: NextFunction) => {

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

    const mediaajanlatok = await getConnection()
        .getRepository(Mediaajanlat)
        .createQueryBuilder("mediaajanlat")
        .orderBy("mediaajanlat.id", "DESC")
        .getMany();
    if (mediaajanlatok.length) {
        mediaajanlatok[0].szoveg = req.body.szoveg;
        const m = await mediaajanlatok[0].save();
        if (m.id) {
            return res.json({ m, message: "A médiaajánlat módosítása sikeres." });
        } else {
            return res.json({ message: "Hiba történt a médiaajánlat módosítása közben. Kérem próbálja újra később." });
        }
    } else {
        const ujmediaajanlat = new Mediaajanlat();
        ujmediaajanlat.szoveg = req.body.szoveg;
        await ujmediaajanlat.save();
        if (ujmediaajanlat.id) {
            return res.json({ ujmediaajanlat, message: "A médiaajánlat módosítása sikeres." });
        } else {
            return res.json({ message: "Hiba történt a médiaajánlat módosítása közben. Kérem próbálja újra később." });
        }
    }
};
