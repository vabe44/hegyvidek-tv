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
const jwt = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const Musorujsag_1 = require("../entity/Musorujsag");
/**
 * GET /hirek
 * Osszes hir.
 */
exports.getMusorujsag = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorujsag = yield typeorm_1.getConnection()
        .getRepository(Musorujsag_1.Musorujsag)
        .createQueryBuilder("musorujsag")
        .orderBy("musorujsag.nap", "ASC")
        .getMany();
    if (musorujsag.length) {
        return res.json({ musorujsag });
    }
    else {
        return res.json({ message: "Hiba történt a műsorújság lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /bannerek/banner
 * Egy banner.
 */
exports.getMusorujsagId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorujsag = yield Musorujsag_1.Musorujsag.findOne(req.params.id);
    if (musorujsag.id) {
        return res.json({ musorujsag });
    }
    else {
        return res.json({ message: "Hiba történt az adás lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /epizodok
 * Osszes epizod.
 */
exports.getMusorAdasok = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const adasok = yield typeorm_1.getConnection()
        .getRepository(Musorujsag_1.Musorujsag)
        .createQueryBuilder("musorujsag")
        .where("musorujsag.musorId like :kereses", { kereses: req.params.musorId })
        .getMany();
    if (adasok.length) {
        return res.json({ adasok });
    }
    else {
        return res.json({ message: "Hiba történt az adások lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * POST /bannerek
 * Uj banner letrehozasa.
 */
exports.postMusorujsag = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musorujsag = new Musorujsag_1.Musorujsag();
    musorujsag.nap = req.body.nap;
    musorujsag.sorrend = req.body.sorrend;
    musorujsag.adascim = req.body.adascim;
    musorujsag.link = req.body.link;
    musorujsag.aktivEttol = req.body.aktivEttol;
    musorujsag.aktivEddig = req.body.aktivEddig;
    // musorujsag.musor = await Musor.findOne(req.body.musor.id);
    yield musorujsag.save();
    if (musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás létrehozása sikeres." });
    }
    else {
        return res.json({ message: "Hiba törtent az adás létrehozása közben. Kérem próbálja újra később." });
    }
});
/**
 * PUT /bannerek
 * Banner modositasa.
 */
exports.putMusorujsag = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musorujsag = yield Musorujsag_1.Musorujsag.findOne(req.body.id);
    musorujsag.nap = req.body.nap;
    musorujsag.sorrend = req.body.sorrend;
    musorujsag.adascim = req.body.adascim;
    musorujsag.link = req.body.link;
    musorujsag.aktivEttol = req.body.aktivEttol;
    musorujsag.aktivEddig = req.body.aktivEddig;
    yield musorujsag.save();
    if (musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás módosítása sikeres." });
    }
    else {
        return res.json({ message: "Hiba törtent az adás módosítása közben. Kérem próbálja újra később." });
    }
});
/**
 * DELETE /bannerek
 * Banner torlese.
 */
exports.deleteMusorujsag = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musorujsag = yield Musorujsag_1.Musorujsag.findOne(req.params.id);
    yield musorujsag.remove();
    if (!musorujsag.id) {
        return res.json({ musorujsag, message: "Az adás törlése sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt az adás törlése közben. Kérem próbálja újra később." });
    }
});
//# sourceMappingURL=musorujsag.js.map