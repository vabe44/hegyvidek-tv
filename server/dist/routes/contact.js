"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController = require("../controllers/contact");
class Contact {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get("/", contactController.getContact);
        this.router.post("/", contactController.postContact);
        this.router.put("/gmail", contactController.putGmail);
        this.router.get("/gmail", contactController.getGmailCredentials);
    }
}
const contactRoutes = new Contact();
exports.default = contactRoutes.router;
//# sourceMappingURL=contact.js.map