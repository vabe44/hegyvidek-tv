"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    // tslint:disable-next-line:max-line-length
    res.sendFile(path.join(__dirname, "../../../", process.env.CLIENT_DIST_PATH, "/index.html"));
};
//# sourceMappingURL=home.js.map