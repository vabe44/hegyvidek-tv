import * as async from "async";
import { NextFunction, Request, Response } from "express";
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

/**
 * PUT /musoraink
 * Musor modositasa.
 */
export let putMusor =  async (req: Request, res: Response, next: NextFunction) => {

    const musor = await Musor.findOneById(req.body.id);
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
