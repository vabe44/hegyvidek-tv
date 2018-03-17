import { NextFunction, Request, Response, Router } from "express";
import * as epizodController from "../controllers/epizod";

class Epizodok {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", epizodController.getEpizod);
    this.router.post("/", epizodController.postEpizod);
    this.router.put("/", epizodController.putEpizod);
    this.router.post("/urlcheck", epizodController.checkUrl);
    this.router.post("/video", epizodController.uploadVideo);
    this.router.get("/:id", epizodController.getEpizodId);
    this.router.delete("/:id", epizodController.deleteEpizod);
  }
}

const epizodokRoutes = new Epizodok();
export default epizodokRoutes.router as Router;
