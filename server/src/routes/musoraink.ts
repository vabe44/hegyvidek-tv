import { NextFunction, Request, Response, Router } from "express";
import * as musorController from "../controllers/musor";

class Musoraink {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", musorController.getMusor);
    this.router.get("/:id", musorController.getMusorId);
    this.router.post("/", musorController.postMusor);
    this.router.put("/", musorController.putMusor);
  }
}

const musorRoutes = new Musoraink();
export default musorRoutes.router;
