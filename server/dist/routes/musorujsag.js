"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const musorujsagController = require("../controllers/musorujsag");
// import * as VerifyToken from "../middlewares/verifyJwt";
class Musorujsag {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", musorujsagController.getMusorujsag);
        this.router.get("/:id", musorujsagController.getMusorujsagId);
        this.router.get("/musor/:musorId", musorujsagController.getMusorAdasok);
        this.router.post("/", musorujsagController.postMusorujsag);
        this.router.put("/", musorujsagController.putMusorujsag);
        this.router.delete("/:id", musorujsagController.deleteMusorujsag);
    }
}
const musorujsagRoutes = new Musorujsag();
exports.default = musorujsagRoutes.router;
//# sourceMappingURL=musorujsag.js.map