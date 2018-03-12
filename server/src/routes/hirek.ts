import { NextFunction, Request, Response, Router } from "express";
import * as hirController from "../controllers/hir";

class Hirek {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", hirController.getHirek);
    this.router.get("/:id", hirController.getHirId);
    this.router.post("/", hirController.postHir);
    this.router.put("/", hirController.putHir);
    this.router.delete("/:id", hirController.deleteHir);
  }
}

const hirRoutes = new Hirek();
export default hirRoutes.router;
