import { NextFunction, Request, Response, Router } from "express";
import * as bannerController from "../controllers/banner";
// import * as VerifyToken from "../middlewares/verifyJwt";

class Bannerek {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/", bannerController.getBannerek);
    this.router.get("/ervenyes", bannerController.getErvenyesBannerek);
    this.router.get("/:id", bannerController.getBannerId);
    this.router.post("/", bannerController.postBanner);
    this.router.put("/", bannerController.putBanner);
    this.router.delete("/:id", bannerController.deleteBanner);
    this.router.post("/picture", bannerController.uploadPicture);
  }
}

const bannerRoutes = new Bannerek();
export default bannerRoutes.router as Router;
