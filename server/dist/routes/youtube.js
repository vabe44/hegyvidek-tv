"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const youtubeController = require("../controllers/youtube");
class YouTube {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/settings", youtubeController.getSettings);
        this.router.post("/settings", youtubeController.editSettings);
        this.router.delete("/settings", youtubeController.deleteSettings);
        this.router.get("/save-tokens", youtubeController.saveTokens);
        this.router.get("/oauth", youtubeController.oauth);
        this.router.post("/upload", youtubeController.upload);
    }
}
const youtubeRoutes = new YouTube();
exports.default = youtubeRoutes.router;
//# sourceMappingURL=youtube.js.map