"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const musorController = require("../controllers/musor");
class Musoraink {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", musorController.getMusor);
        this.router.get("/aktivmusorok", musorController.getAktivMusor);
        this.router.get("/url/:musorUrl", musorController.getMusorUrl);
        this.router.get("/:id", musorController.getMusorId);
        this.router.post("/", musorController.postMusor);
        this.router.post("/urlcheck", musorController.checkUrl);
        this.router.put("/", musorController.putMusor);
        this.router.delete("/:id", musorController.deleteMusor);
        this.router.post("/picture", musorController.uploadPicture);
    }
}
const musorRoutes = new Musoraink();
exports.default = musorRoutes.router;
//# sourceMappingURL=musoraink.js.map