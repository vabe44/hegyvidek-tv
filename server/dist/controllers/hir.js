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
const Hir_1 = require("../entity/Hir");
/**
 * GET /hirek
 * Osszes hir.
 */
exports.getHirek = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const hirek = yield typeorm_1.getConnection()
        .getRepository(Hir_1.Hir)
        .createQueryBuilder("hir")
        .orderBy("hir.createdDate", "DESC")
        .getMany();
    if (hirek.length) {
        return res.json({ hirek });
    }
    else {
        return res.json({ message: "Hiba tortent a hirek lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * GET /hirek/hir
 * Egy hir.
 */
exports.getHirId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const hir = yield Hir_1.Hir.findOneById(req.params.id);
    if (hir.id) {
        return res.json({ hir });
    }
    else {
        return res.json({ message: "Hiba tortent a hir lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * POST /hirek
 * Uj hir letrehozasa.
 */
exports.postHir = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const hir = new Hir_1.Hir();
    hir.szoveg = req.body.szoveg;
    hir.statusz = req.body.statusz;
    yield hir.save();
    // tslint:disable-next-line:no-console
    console.log(req.body);
    if (hir.id) {
        return res.json({ hir });
    }
    else {
        return res.json({ message: "Hiba tortent a hir letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * PUT /hirek
 * Hir modositasa.
 */
exports.putHir = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const hir = yield Hir_1.Hir.findOneById(req.body.id);
    hir.szoveg = req.body.szoveg;
    hir.statusz = req.body.statusz;
    yield hir.save();
    if (hir.id) {
        return res.json({ hir });
    }
    else {
        return res.json({ message: "Hiba tortent a hir modositasa kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * DELETE /hirek
 * Hir torlese.
 */
exports.deleteHir = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    const hir = yield Hir_1.Hir.findOneById(req.params.id);
    yield hir.remove();
    if (!hir.id) {
        return res.json({ hir });
    }
    else {
        return res.json({ message: "Hiba tortent a hir torlese kozben. Kerem probalja ujra kesobb." });
    }
});
//# sourceMappingURL=hir.js.map