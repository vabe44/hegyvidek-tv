import { NextFunction, Request, Response, Router } from "express";
import * as musorController from "../controllers/musor";
import { uploadPicture } from "./../controllers/musor";

class Musoraink {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", musorController.getMusor);
    this.router.get("/aktivmusorok", musorController.getAktivMusor);
    this.router.get("/url/:musorUrl", musorController.getMusorUrl);
    this.router.get("/:id", musorController.getMusorId);
    this.router.post("/", musorController.postMusor);
    this.router.post("/urlcheck", musorController.checkUrl);
    this.router.put("/", musorController.putMusor);
    this.router.delete("/:id", musorController.deleteMusor);
    this.router.post("/picture", musorController.uploadPicture);
  }
}

const musorRoutes = new Musoraink();
export default musorRoutes.router as Router;
