import { NextFunction, Request, Response, Router } from "express";
import * as musorController from "../controllers/musor";

class Musoraink {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.post("/", musorController.postMusor);
  }
}

const musorRoutes = new Musoraink();
export default musorRoutes.router;
