"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController = require("../controllers/home");
const userController = require("../controllers/user");
class Root {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", homeController.index);
        this.router.get("/api/login", userController.getLogin);
        this.router.post("/api/login", userController.postLogin);
        this.router.get("/api/logout", userController.logout);
        // this.router.get("/api/signup", userController.getSignup);
        // this.router.post("/api/signup", userController.postSignup);
    }
}
const rootRoutes = new Root();
exports.default = rootRoutes.router;
//# sourceMappingURL=root.js.map