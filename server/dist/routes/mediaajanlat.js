"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mediaajanlatController = require("../controllers/mediaajanlat");
// import * as VerifyToken from "../middlewares/verifyJwt";
class Mediaajanlat {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", mediaajanlatController.getMediaajanlat);
        this.router.put("/", mediaajanlatController.putMediaajanlat);
    }
}
const mediaajanlatRoutes = new Mediaajanlat();
exports.default = mediaajanlatRoutes.router;
//# sourceMappingURL=mediaajanlat.js.map