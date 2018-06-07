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
const multer = require("multer");
const typeorm_1 = require("typeorm");
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
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
exports.getAktivMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorok = yield Musor_1.Musor.find({ statusz: "aktív" });
    if (musorok.length) {
        return res.json({ musorok });
    }
    else {
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
exports.getHirek = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorok = yield Musor_1.Musor.find({ cim: "Hírek" });
    if (musorok.length) {
        return res.json({ musorok });
    }
    else {
        return res.json({ message: "Hiba történt a műsorok lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /musoraink/musor
 * Egy musor.
 */
exports.getMusorId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield Musor_1.Musor.findOne(req.params.id);
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba történt a műsor lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /aktivmusoraink
 * Osszes musor.
 */
exports.getMusorUrl = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield typeorm_1.getConnection()
        .getRepository(Musor_1.Musor)
        .createQueryBuilder("musor")
        .where("musor.url = :url", { url: req.params.musorUrl })
        .innerJoinAndSelect("musor.epizodok", "epizodok")
        // .orderBy("musor.epizodok.datum", "DESC")
        .getOne();
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba történt a műsor lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * POST /musoraink
 * Uj musor letrehozasa.
 */
exports.postMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musor = new Musor_1.Musor();
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    yield musor.save();
    if (musor.id) {
        return res.json({ musor, message: "A műsor létrehozása sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt a műsor létrehozása közben. Kérem próbálja újra később." });
    }
});
/**
 * PUT /musoraink
 * Musor modositasa.
 */
exports.putMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musor = yield Musor_1.Musor.findOne(req.body.id);
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    yield musor.save();
    if (musor.id) {
        return res.json({ musor, message: "A műsor módosítása sikeres." });
    }
    else {
        return res.json({ message: "Hiba törtent a műsor módosítása közben. Kérem próbalja újra később." });
    }
});
/**
 * DELETE /musoraink
 * Musor torlese.
 */
exports.deleteMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const musor = yield Musor_1.Musor.findOne(req.params.id);
    yield musor.remove();
    if (!musor.id) {
        return res.json({ musor, message: "A műsor törlése sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt a műsor törlése közben. Kérem próbálja újra később." });
    }
});
/**
 * POST /musoraink KEP
 * Musor kep feltoltese.
 */
exports.uploadPicture = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // set the directory for the uploads to the uploaded to
    const DIR = process.env.SERVER_IMAGES_PATH;
    // tslint:disable-next-line:max-line-length
    // define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
    const upload = multer({ dest: DIR }).single("photo");
    upload(req, res, (err) => {
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
});
/**
 * GET /musoraink
 * Osszes musor.
 */
exports.checkUrl = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorok = yield Musor_1.Musor.find({ url: req.body.url });
    if (musorok.length) {
        return res.json({ unique: false });
    }
    else {
        return res.json({ unique: true });
    }
});
//# sourceMappingURL=musor.js.map