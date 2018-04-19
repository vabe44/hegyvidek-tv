"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bannerController = require("../controllers/banner");
// import * as VerifyToken from "../middlewares/verifyJwt";
class Bannerek {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", bannerController.getBannerek);
        this.router.get("/:id", bannerController.getBannerId);
        this.router.post("/", bannerController.postBanner);
        this.router.put("/", bannerController.putBanner);
        this.router.delete("/:id", bannerController.deleteBanner);
        this.router.post("/picture", bannerController.uploadPicture);
    }
}
const bannerRoutes = new Bannerek();
exports.default = bannerRoutes.router;
//# sourceMappingURL=bannerek.js.map