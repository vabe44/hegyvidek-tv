import * as async from "async";
import { NextFunction, Request, Response } from "express";
import { Musor } from "../entity/Musor";

/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
export let postMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = new Musor();
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.megjelenites = req.body.megjelenites;
    musor.periodus = req.body.periodus;
    musor.kep = req.body.kep;
    musor.rovidLeiras = req.body.rovidLeiras;
    musor.reszletesLeiras = req.body.reszletesLeiras;
    await musor.save();

    if (musor.id) {
        return res.json({ message: "ok", musor });
    } else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};
