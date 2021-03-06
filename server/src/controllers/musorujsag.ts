import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { Musor } from "../entity/Musor";
import { Musorujsag } from "../entity/Musorujsag";

/**
 * GET /hirek
 * Osszes hir.
 */
export let getMusorujsag =  async (req: Request, res: Response, next: NextFunction) => {

    const musorujsag = await getConnection()
        .getRepository(Musorujsag)
        .createQueryBuilder("musorujsag")
        .orderBy("musorujsag.nap", "ASC")
        .getMany();
    if (musorujsag.length) {
        return res.json({ musorujsag });
    } else {
        return res.json({ message: "Hiba történt a műsorújság lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /bannerek/banner
 * Egy banner.
 */
export let getMusorujsagId =  async (req: Request, res: Response, next: NextFunction) => {

    const musorujsag = await Musorujsag.findOne(req.params.id);
    if (musorujsag.id) {
        return res.json({ musorujsag });
    } else {
        return res.json({ message: "Hiba történt az adás lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * GET /epizodok
 * Osszes epizod.
 */
export let getMusorAdasok =  async (req: Request, res: Response, next: NextFunction) => {

    const adasok = await getConnection()
        .getRepository(Musorujsag)
        .createQueryBuilder("musorujsag")
        .where("musorujsag.musorId like :kereses",
            {kereses: req.params.musorId })
        .getMany();

    if (adasok.length) {
        return res.json({ adasok });
    } else {
        return res.json({ message: "Hiba történt az adások lekérdezése közben. Kérem próbálja újra később." });
    }
};

/**
 * POST /bannerek
 * Uj banner letrehozasa.
 */
export let postMusorujsag =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musorujsag = new Musorujsag();
    musorujsag.nap = req.body.nap;
    musorujsag.sorrend = req.body.sorrend;
    musorujsag.adascim = req.body.adascim;
    musorujsag.link = req.body.link;
    musorujsag.aktivEttol = req.body.aktivEttol;
    musorujsag.aktivEddig = req.body.aktivEddig;
    // musorujsag.musor = await Musor.findOne(req.body.musor.id);
    await musorujsag.save();

    if (musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás létrehozása sikeres." });
    } else {
        return res.json({ message: "Hiba törtent az adás létrehozása közben. Kérem próbálja újra később." });
    }
};

/**
 * PUT /bannerek
 * Banner modositasa.
 */
export let putMusorujsag =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musorujsag = await Musorujsag.findOne(req.body.id);
    musorujsag.nap = req.body.nap;
    musorujsag.sorrend = req.body.sorrend;
    musorujsag.adascim = req.body.adascim;
    musorujsag.link = req.body.link;
    musorujsag.aktivEttol = req.body.aktivEttol;
    musorujsag.aktivEddig = req.body.aktivEddig;
    await musorujsag.save();

    if (musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás módosítása sikeres." });
    } else {
        return res.json({ message: "Hiba törtent az adás módosítása közben. Kérem próbálja újra később." });
    }
};

/**
 * DELETE /bannerek
 * Banner torlese.
 */
export let deleteMusorujsag =  async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const musorujsag = await Musorujsag.findOne(req.params.id);
    await musorujsag.remove();

    if (!musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás törlése sikeres." });
    } else {
        return res.json({ message: "Hiba történt az adás törlése közben. Kérem próbálja újra később." });
    }
};
