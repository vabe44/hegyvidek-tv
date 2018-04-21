import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getConnection } from "typeorm";
import { Hir } from "../entity/Hir";

/**
 * GET /hirek
 * Osszes hir.
 */
export let getHirek =  async (req: Request, res: Response, next: NextFunction) => {

    const hirek = await getConnection()
        .getRepository(Hir)
        .createQueryBuilder("hir")
        .orderBy("hir.createdDate", "DESC")
        .getMany();
    if (hirek.length) {
        return res.json({ hirek });
    } else {
        return res.json({ message: "Hiba tortent a hirek lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * GET /hirek/hir
 * Egy hir.
 */
export let getHirId =  async (req: Request, res: Response, next: NextFunction) => {

    const hir = await Hir.findOne(req.params.id);
    if (hir.id) {
        return res.json({ hir });
    } else {
        return res.json({ message: "Hiba tortent a hir lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * POST /hirek
 * Uj hir letrehozasa.
 */
export let postHir =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const hir = new Hir();
    hir.szoveg = req.body.szoveg;
    hir.statusz = req.body.statusz;
    await hir.save();

    // tslint:disable-next-line:no-console
    console.log(req.body);

    if (hir.id) {
        return res.json({ hir });
    } else {
        return res.json({ message: "Hiba tortent a hir letrehozasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * PUT /hirek
 * Hir modositasa.
 */
export let putHir =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const hir = await Hir.findOne(req.body.id);
    hir.szoveg = req.body.szoveg;
    hir.statusz = req.body.statusz;
    await hir.save();

    if (hir.id) {
        return res.json({ hir });
    } else {
        return res.json({ message: "Hiba tortent a hir modositasa kozben. Kerem probalja ujra kesobb." });
    }
};

/**
 * DELETE /hirek
 * Hir torlese.
 */
export let deleteHir =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
      return res.status(403).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      }
    });

    const hir = await Hir.findOne(req.params.id);
    await hir.remove();

    if (!hir.id) {
        return res.json({ hir });
    } else {
        return res.json({ message: "Hiba tortent a hir torlese kozben. Kerem probalja ujra kesobb." });
    }
};
