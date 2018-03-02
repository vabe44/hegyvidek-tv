"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Musor_1 = require("../entity/Musor");
/**
 * GET /musoraink
 * Osszes musor.
 */
exports.getMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorok = yield Musor_1.Musor.find();
    if (musorok.length) {
        return res.json({ musorok });
    }
    else {
        return res.json({ message: "Hiba tortent a musorok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * GET /musoraink/musor
 * Egy musor.
 */
exports.getMusorId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield Musor_1.Musor.findOneById(req.params.id);
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
exports.postMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = new Musor_1.Musor();
    musor.cim = req.body.musorCim;
    musor.url = req.body.musorUrl;
    musor.statusz = req.body.musorStatusz;
    musor.megjelenites = req.body.musorMegjelenites;
    musor.periodus = req.body.musorPeriodus;
    musor.kep = req.body.musorKep;
    musor.rovidLeiras = req.body.musorRovidLeiras;
    musor.reszletesLeiras = req.body.musorReszletesLeiras;
    yield musor.save();
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * PUT /musoraink
 * Musor modositasa.
 */
exports.putMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield Musor_1.Musor.findOneById(req.body.id);
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.megjelenites = req.body.megjelenites;
    musor.periodus = req.body.periodus;
    musor.kep = req.body.kep;
    musor.rovidLeiras = req.body.rovidLeiras;
    musor.reszletesLeiras = req.body.reszletesLeiras;
    yield musor.save();
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor modositasa kozben. Kerem probalja ujra kesobb." });
    }
});
//# sourceMappingURL=musor.js.map