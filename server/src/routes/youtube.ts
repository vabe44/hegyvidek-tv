import { NextFunction, Request, Response, Router } from "express";
import * as youtubeController from "../controllers/youtube";

class YouTube {
  public router: Router;
  public constructor() {
    this.router = Router();
    this.init();
  }
  private init() {
    this.router.get("/save-tokens", youtubeController.saveTokens);
    this.router.get("/oauth", youtubeController.oauth);
    this.router.post("/upload", youtubeController.upload);
  }
}

const youtubeRoutes = new YouTube();
export default youtubeRoutes.router;
