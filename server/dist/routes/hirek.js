"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hirController = require("../controllers/hir");
// import * as VerifyToken from "../middlewares/verifyJwt";
class Hirek {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", hirController.getHirek);
        this.router.get("/:id", hirController.getHirId);
        this.router.post("/", hirController.postHir);
        this.router.put("/", hirController.putHir);
        this.router.delete("/:id", hirController.deleteHir);
    }
}
const hirRoutes = new Hirek();
exports.default = hirRoutes.router;
//# sourceMappingURL=hirek.js.map