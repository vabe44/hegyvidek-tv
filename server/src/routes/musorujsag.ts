import { NextFunction, Request, Response, Router } from "express";
import * as musorujsagController from "../controllers/musorujsag";
// import * as VerifyToken from "../middlewares/verifyJwt";

class Musorujsag {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", musorujsagController.getMusorujsag);
    this.router.get("/:id", musorujsagController.getMusorujsagId);
    this.router.get("/musor/:musorId", musorujsagController.getMusorAdasok);
    this.router.post("/", musorujsagController.postMusorujsag);
    this.router.put("/", musorujsagController.putMusorujsag);
    this.router.delete("/:id", musorujsagController.deleteMusorujsag);
  }
}

const musorujsagRoutes = new Musorujsag();
export default musorujsagRoutes.router as Router;
