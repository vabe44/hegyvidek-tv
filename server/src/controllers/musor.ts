import * as async from "async";
import { NextFunction, Request, Response } from "express";
import { Musor } from "../entity/Musor";

/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
export let postMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = new Musor();
    musor.cim = req.body.musorCim;
    musor.url = req.body.musorUrl;
    musor.statusz = req.body.musorStatusz;
    musor.megjelenites = req.body.musorMegjelenites;
    musor.periodus = req.body.musorPeriodus;
    musor.kep = req.body.musorKep;
    musor.rovidLeiras = req.body.musorRovidLeiras;
    musor.reszletesLeiras = req.body.musorReszletesLeiras;
    await musor.save();

    if (musor.id) {
        return res.json({ musor });
    } else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};
