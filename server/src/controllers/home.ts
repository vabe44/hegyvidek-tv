import { Request, Response } from "express";
import * as path from "path";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  // tslint:disable-next-line:max-line-length
  res.sendFile(path.join(__dirname, "../../../", process.env.CLIENT_DIST_PATH, "/index.html"));
};
