"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const bodyParser = require("body-parser");
const compression = require("compression"); // compresses requests
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const lusca = require("lusca");
const logger = require("morgan");
const passport = require("passport");
const path = require("path");
const expressValidator = require("express-validator");
const http_1 = require("http");
require("reflect-metadata");
const io = require("socket.io");
const typeorm_1 = require("typeorm");
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });
/**
 * Routes
 */
const account_1 = require("./routes/account");
const api_1 = require("./routes/api");
const contact_1 = require("./routes/contact");
const hirek_1 = require("./routes/hirek");
const musoraink_1 = require("./routes/musoraink");
const oauth_1 = require("./routes/oauth");
const root_1 = require("./routes/root");
class App {
    constructor() {
        this.express = express();
        this.server = http_1.createServer(this.express);
        this.io = io(this.server);
        this.middleware();
        this.routes();
        this.launchConf();
    }
    middleware() {
        this.express.set("port", process.env.PORT || 3000);
        this.express.set("views", path.join(__dirname, "../views"));
        this.express.set("view engine", "pug");
        this.express.use(compression());
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(expressValidator());
        this.express.use(session({
            resave: true,
            saveUninitialized: true,
            secret: process.env.SESSION_SECRET,
        }));
        this.express.use(passport.initialize());
        this.express.use(passport.session());
        this.express.use(flash());
        this.express.use(lusca.xframe("SAMEORIGIN"));
        this.express.use(lusca.xssProtection(true));
        this.express.use(cors({
            credentials: true,
            origin: process.env.CLIENT_URL_FOR_CORS,
        }));
        this.express.use((req, res, next) => {
            res.locals.user = req.user;
            next();
        });
        this.express.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
    }
    /**
     * Primary app routes.
     */
    routes() {
        this.express.use("/", root_1.default);
        this.express.use("/api", api_1.default);
        this.express.use("/auth", oauth_1.default);
        this.express.use("/account", account_1.default);
        this.express.use("/contact", contact_1.default);
        this.express.use("/musoraink", musoraink_1.default);
        this.express.use("/hirek", hirek_1.default);
    }
    launchConf() {
        // TypeORM connection
        typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
        })).catch((error) => console.log("TypeORM connection error: ", error));
        this.express.use(errorHandler());
        /**
         * Start Express server.
         */
        this.express.listen(this.express.get("port"), () => {
            // tslint:disable-next-line:no-console
            console.log(("  App is running at http://localhost:%d \
      in %s mode"), this.express.get("port"), this.express.get("env"));
            // tslint:disable-next-line:no-console
            console.log("  Press CTRL-C to stop\n");
        });
        this.io.on("connect", (socket) => {
            // tslint:disable-next-line:no-console
            console.log("Connected client on port %s.", this.express.get("port"));
            socket.on("message", (m) => {
                // tslint:disable-next-line:no-console
                console.log("[server](message): %s", JSON.stringify(m));
                this.io.emit("message", m);
            });
            socket.on("disconnect", () => {
                // tslint:disable-next-line:no-console
                console.log("Client disconnected");
            });
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=server.js.map