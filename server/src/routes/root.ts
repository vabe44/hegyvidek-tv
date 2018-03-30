import { NextFunction, Request, Response, Router } from "express";

import * as homeController from "../controllers/home";
import * as userController from "../controllers/user";
class Root {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", homeController.index);
    this.router.get("/login", userController.getLogin);
    this.router.post("/login", userController.postLogin);
    this.router.get("/logout", userController.logout);
    this.router.get("/signup", userController.getSignup);
    this.router.post("/signup", userController.postSignup);
  }
}

const rootRoutes = new Root();
export default rootRoutes.router as Router;
