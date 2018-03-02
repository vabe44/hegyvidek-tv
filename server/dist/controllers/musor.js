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
 * POST /musoraink
 * Uj musor letrehozasa.
 */
exports.postMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = new Musor_1.Musor();
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
        return res.json({ message: "ok", musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
});
//# sourceMappingURL=musor.js.map