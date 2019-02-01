import { NextFunction, Request, Response, Router } from "express";
import * as mediaajanlatController from "../controllers/mediaajanlat";
// import * as VerifyToken from "../middlewares/verifyJwt";

class Mediaajanlat {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", mediaajanlatController.getMediaajanlat);
    this.router.put("/", mediaajanlatController.putMediaajanlat);
  }
}

const mediaajanlatRoutes = new Mediaajanlat();
export default mediaajanlatRoutes.router as Router;
