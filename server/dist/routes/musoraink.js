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
        this.router.get("/:id", musorController.getMusorId);
        this.router.post("/", musorController.postMusor);
        this.router.put("/", musorController.putMusor);
    }
}
const musorRoutes = new Musoraink();
exports.default = musorRoutes.router;
//# sourceMappingURL=musoraink.js.map