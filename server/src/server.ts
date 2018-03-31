/**
 * Module dependencies.
 */
import * as bodyParser from "body-parser";
import * as compression from "compression";  // compresses requests
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as errorHandler from "errorhandler";
import * as express from "express";
import * as flash from "express-flash";
import * as session from "express-session";
import expressValidator = require("express-validator");
import { createServer, Server } from "http";
import * as lusca from "lusca";
import * as logger from "morgan";
import * as passport from "passport";
import * as path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Routes
 */
import contactRouter from "./routes/contact";
import epizodokRouter from "./routes/epizodok";
import hirekRouter from "./routes/hirek";
import musorainkRouter from "./routes/musoraink";
import rootRouter from "./routes/root";
import youtubeRouter from "./routes/youtube";

/**
 * API keys and Passport configuration.
 */
import * as passportConfig from "./config/passport";
class App {

  // ref to Express instance
  public express: express.Application;
  private server: Server;

  constructor() {
    this.express = express();
    this.server = createServer(this.express);
    this.middleware();
    this.routes();
    this.launchConf();

  }
  private middleware(): void {
    this.express.set("port", process.env.PORT || 3000);
    // this.express.set("views", path.join(process.env.CLIENT_DIST_PATH));
    // this.express.set("view engine", "pug");
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
    // tslint:disable-next-line:max-line-length
    this.express.use(express.static(path.join(__dirname, "../../client/HegyvidekTVClient/dist"), { maxAge: 31557600000 }));
    // tslint:disable-next-line:max-line-length
    this.express.use(express.static(path.join(__dirname, "../../server/dist/public"), { maxAge: 31557600000 }));
  }
  /**
   * Primary app routes.
   */
  private routes(): void {
    this.express.use("/", rootRouter);
    this.express.use("/api/contact", contactRouter);
    this.express.use("/api/musoraink", musorainkRouter);
    this.express.use("/api/epizodok", epizodokRouter);
    this.express.use("/api/hirek", hirekRouter);
    this.express.use("/api/youtube", youtubeRouter);
    this.express.use("*", rootRouter);
  }

  private launchConf() {
    // TypeORM connection
    createConnection().then(async (connection) => {
    // tslint:disable-next-line:no-console
    }).catch((error) => console.log("TypeORM connection error: ", error));

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
  }
}

export default new App().express;
