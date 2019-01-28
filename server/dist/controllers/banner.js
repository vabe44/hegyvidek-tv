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
const Banner_1 = require("../entity/Banner");
/**
 * GET /bannerek
 * Osszes banner.
 */
exports.getBannerek = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bannerek = yield typeorm_1.getConnection()
        .getRepository(Banner_1.Banner)
        .createQueryBuilder("banner")
        .orderBy("banner.createdDate", "DESC")
        .getMany();
    if (bannerek.length) {
        return res.json({ bannerek });
    }
    else {
        return res.json({ message: "Hiba történt a bannerek lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /bannerek/banner
 * Egy banner.
 */
exports.getBannerId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const banner = yield Banner_1.Banner.findOne(req.params.id);
    if (banner.id) {
        return res.json({ banner });
    }
    else {
        return res.json({ message: "Hiba történt a banner lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * GET /epizodok
 * Osszes epizod.
 */
exports.getErvenyesBannerek = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const bannerek = yield typeorm_1.getConnection()
        .getRepository(Banner_1.Banner)
        .createQueryBuilder("banner")
        .where("NOW() >= banner.aktivEttol AND NOW() <= banner.aktivEddig AND banner.statusz like 'aktív'")
        .getMany();
    if (bannerek.length) {
        return res.json({ bannerek });
    }
    else {
        return res.json({ message: "Hiba történt az bannerek lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * POST /bannerek
 * Uj banner letrehozasa.
 */
exports.postBanner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const banner = new Banner_1.Banner();
    banner.nev = req.body.nev;
    banner.aktivEttol = req.body.aktivEttol;
    banner.aktivEddig = req.body.aktivEddig;
    banner.statusz = req.body.statusz;
    banner.tipus = req.body.tipus;
    banner.kep = req.body.kep;
    banner.keplink = req.body.keplink;
    banner.embedkod = req.body.embedkod;
    banner.pozicio = req.body.pozicio;
    banner.popupShowDelay = req.body.popupShowDelay;
    banner.popupAutocloseTime = req.body.popupAutocloseTime;
    yield banner.save();
    // tslint:disable-next-line:no-console
    console.log(req.body);
    if (banner.id) {
        return res.json({ banner, message: "A banner létrehozása sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt a banner létrehozása közben. Kérem próbálja újra később." });
    }
});
/**
 * PUT /bannerek
 * Banner modositasa.
 */
exports.putBanner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const banner = yield Banner_1.Banner.findOne(req.body.id);
    banner.nev = req.body.nev;
    banner.aktivEttol = req.body.aktivEttol;
    banner.aktivEddig = req.body.aktivEddig;
    banner.statusz = req.body.statusz;
    banner.tipus = req.body.tipus;
    banner.kep = req.body.kep;
    banner.keplink = req.body.keplink;
    banner.embedkod = req.body.embedkod;
    banner.pozicio = req.body.pozicio;
    banner.popupShowDelay = req.body.popupShowDelay;
    banner.popupAutocloseTime = req.body.popupAutocloseTime;
    yield banner.save();
    if (banner.id) {
        return res.json({ banner, message: "A banner módosítása sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt a banner módosítása közben. Kérem próbálja újra később." });
    }
});
/**
 * DELETE /bannerek
 * Banner torlese.
 */
exports.deleteBanner = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const banner = yield Banner_1.Banner.findOne(req.params.id);
    yield banner.remove();
    if (!banner.id) {
        return res.json({ banner, message: "A banner törlése sikeres." });
    }
    else {
        return res.json({ message: "Hiba történt a banner törlése közben. Kérem próbálja újra később." });
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
//# sourceMappingURL=banner.js.map