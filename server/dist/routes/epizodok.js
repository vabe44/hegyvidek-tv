"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const epizodController = require("../controllers/epizod");
class Epizodok {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", epizodController.getEpizod);
        this.router.post("/", epizodController.postEpizod);
        this.router.put("/", epizodController.putEpizod);
        this.router.post("/urlcheck", epizodController.checkUrl);
        this.router.post("/video", epizodController.uploadVideo);
        this.router.get("/kereses", epizodController.getEpizodKereses);
        this.router.get("/:id", epizodController.getEpizodId);
        this.router.delete("/:id", epizodController.deleteEpizod);
    }
}
const epizodokRoutes = new Epizodok();
exports.default = epizodokRoutes.router;
//# sourceMappingURL=epizodok.js.map