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
const googleapis_1 = require("googleapis");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const typeorm_1 = require("typeorm");
const Epizod_1 = require("../entity/Epizod");
const Musor_1 = require("../entity/Musor");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const oauth2Client = new OAuth2("15446227899-uo4u0njei3sf26b7r3qmu9hbqide94h3.apps.googleusercontent.com", "sW0B-dppq2AIl3tn0IxDwl9C", "http://localhost:3000/epizodok/video");
/**
 * GET /epizodok
 * Osszes epizod.
 */
exports.getEpizod = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const epizodok = yield Epizod_1.Epizod.find();
    if (epizodok.length) {
        return res.json({ epizodok });
    }
    else {
        return res.json({ message: "Hiba tortent a epizodok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * GET /epizodok
 * Osszes epizod.
 */
exports.getEpizodKereses = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const epizodok = yield typeorm_1.getConnection()
        .getRepository(Epizod_1.Epizod)
        .createQueryBuilder("epizod")
        .where("epizod.cim like :kereses OR epizod.leiras like :kereses OR epizod.kulcsszavak like :kereses", { kereses: "%" + req.query.szoveg + "%" })
        .innerJoinAndSelect("epizod.musor", "musor")
        .getMany();
    if (epizodok.length) {
        return res.json({ epizodok });
    }
    else {
        return res.json({ message: "Hiba tortent a epizodok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * GET /epizodok/epizod
 * Egy epizod.
 */
exports.getEpizodId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const epizod = yield Epizod_1.Epizod.findOneById(req.params.id);
    if (epizod.id) {
        return res.json({ epizod });
    }
    else {
        return res.json({ message: "Hiba tortent a epizod lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * POST /epizodok
 * Uj epizod letrehozasa.
 */
exports.postEpizod = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const epizod = new Epizod_1.Epizod();
    epizod.cim = req.body.cim;
    epizod.url = req.body.url;
    epizod.statusz = req.body.statusz;
    epizod.kiemelt = req.body.kiemelt;
    epizod.datum = req.body.datum;
    epizod.kep = req.body.kep;
    epizod.video = req.body.video;
    epizod.youtube = req.body.youtube;
    epizod.leiras = req.body.leiras;
    epizod.kulcsszavak = req.body.kulcsszavak;
    epizod.musor = req.body.musor;
    yield epizod.save();
    if (epizod.id) {
        return res.json({ epizod });
    }
    else {
        return res.json({ message: "Hiba tortent a epizod letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * PUT /epizodok
 * Epizod modositasa.
 */
exports.putEpizod = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const epizod = yield Epizod_1.Epizod.findOneById(req.body.id);
    epizod.cim = req.body.cim;
    epizod.url = req.body.url;
    epizod.statusz = req.body.statusz;
    epizod.kiemelt = req.body.kiemelt;
    epizod.datum = req.body.datum;
    epizod.kep = req.body.kep;
    epizod.video = req.body.video;
    epizod.youtube = req.body.youtube;
    epizod.leiras = req.body.leiras;
    epizod.kulcsszavak = req.body.kulcsszavak;
    epizod.musor = yield Musor_1.Musor.findOneById(req.body.musor);
    yield epizod.save();
    if (epizod.id) {
        return res.json({ epizod });
    }
    else {
        return res.json({ message: "Hiba tortent a epizod modositasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * DELETE /epizodok
 * Epizod torlese.
 */
exports.deleteEpizod = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const epizod = yield Epizod_1.Epizod.findOneById(req.params.id);
    yield epizod.remove();
    if (!epizod.id) {
        return res.json({ epizod });
    }
    else {
        return res.json({ message: "Hiba tortent a epizod torlese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * POST /epizodok KEP
 * Epizod kep feltoltese.
 */
exports.uploadVideo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // set the directory for the uploads to the uploaded to
    const DIR = process.env.SERVER_VIDEOS_PATH;
    // tslint:disable-next-line:max-line-length
    // define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
    const upload = multer({ dest: DIR }).single("video");
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
    const epizodok = yield Epizod_1.Epizod.find({ url: req.body.url });
    if (epizodok.length) {
        return res.json({ unique: false });
    }
    else {
        return res.json({ unique: true });
    }
});
//# sourceMappingURL=epizod.js.map