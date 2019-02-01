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
const Mediaajanlat_1 = require("../entity/Mediaajanlat");
/**
 * GET /bannerek
 * Osszes banner.
 */
exports.getMediaajanlat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const mediaajanlat = yield typeorm_1.getConnection()
        .getRepository(Mediaajanlat_1.Mediaajanlat)
        .createQueryBuilder("mediajanlat")
        .orderBy("mediajanlat.id", "DESC")
        .getMany();
    if (mediaajanlat.length) {
        return res.json({ mediaajanlat: mediaajanlat[0].szoveg });
    }
    else {
        return res.json({ message: "Hiba történt a médiaajánlat lekérdezése közben. Kérem próbálja újra később." });
    }
});
/**
 * PUT /mediaajanlat
 * Mediaajanlat modositasa.
 */
exports.putMediaajanlat = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const mediaajanlatok = yield typeorm_1.getConnection()
        .getRepository(Mediaajanlat_1.Mediaajanlat)
        .createQueryBuilder("mediaajanlat")
        .orderBy("mediaajanlat.id", "DESC")
        .getMany();
    if (mediaajanlatok.length) {
        mediaajanlatok[0].szoveg = req.body.szoveg;
        const m = yield mediaajanlatok[0].save();
        if (m.id) {
            return res.json({ m, message: "A médiaajánlat módosítása sikeres." });
        }
        else {
            return res.json({ message: "Hiba történt a médiaajánlat módosítása közben. Kérem próbálja újra később." });
        }
    }
    else {
        const ujmediaajanlat = new Mediaajanlat_1.Mediaajanlat();
        ujmediaajanlat.szoveg = req.body.szoveg;
        yield ujmediaajanlat.save();
        if (ujmediaajanlat.id) {
            return res.json({ ujmediaajanlat, message: "A médiaajánlat módosítása sikeres." });
        }
        else {
            return res.json({ message: "Hiba történt a médiaajánlat módosítása közben. Kérem próbálja újra később." });
        }
    }
});
//# sourceMappingURL=mediaajanlat.js.map