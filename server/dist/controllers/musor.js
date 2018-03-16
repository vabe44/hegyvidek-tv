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
const multer = require("multer");
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
 * GET /aktivmusoraink
 * Osszes musor.
 */
exports.getAktivMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musorok = yield Musor_1.Musor.find({ statusz: "aktív" });
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
 * GET /aktivmusoraink
 * Osszes musor.
 */
exports.getMusorUrl = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield Musor_1.Musor.findOne({ url: req.params.musorUrl });
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
    musor.cim = req.body.cim;
    musor.url = req.body.url;
    musor.statusz = req.body.statusz;
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
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
    musor.kep = req.body.kep;
    musor.leiras = req.body.leiras;
    yield musor.save();
    if (musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor modositasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * DELETE /musoraink
 * Musor torlese.
 */
exports.deleteMusor = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const musor = yield Musor_1.Musor.findOneById(req.params.id);
    yield musor.remove();
    if (!musor.id) {
        return res.json({ musor });
    }
    else {
        return res.json({ message: "Hiba tortent a musor torlese kozben. Kerem probalja ujra kesobb." });
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