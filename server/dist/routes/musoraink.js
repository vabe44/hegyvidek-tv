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
        this.router.post("/", musorController.postMusor);
    }
}
const musorRoutes = new Musoraink();
exports.default = musorRoutes.router;
//# sourceMappingURL=musoraink.js.map