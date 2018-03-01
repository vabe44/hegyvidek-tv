import * as async from "async";
import { NextFunction, Request, Response } from "express";
import { Musor } from "../entity/Musor";

/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
export let postMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = new Musor();
    musor.youtube = req.body.youtube;
    musor.kategoria = req.body.kategoria;
    musor.datum = req.body.datum;
    musor.tartalom = req.body.tartalom;
    musor.kulcsszavak = req.body.kulcsszavak;
    musor.kiemelt = req.body.kiemelt;
    await musor.save();

    if (musor.id) {
        return res.json({ message: "ok", musor });
    } else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};
