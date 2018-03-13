import * as async from "async";
import { NextFunction, Request, Response } from "express";
import * as fs from "fs";
import { google } from "googleapis";
import * as multer from "multer";
import { Epizod } from "../entity/Epizod";
import { YouTube } from "../entity/YouTube";

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  "15446227899-uo4u0njei3sf26b7r3qmu9hbqide94h3.apps.googleusercontent.com",
  "sW0B-dppq2AIl3tn0IxDwl9C",
  "http://localhost:3000/youtube/save-tokens",
);

/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
export let oauth =  async (req: Request, res: Response, next: NextFunction) => {

    // generate a url that asks permissions for Google+ and Google Calendar scopes
    const scopes = [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.upload",
    ];

    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes,

      // Optional property that passes state parameters to redirect URI
      // state: 'foo'
    });
    // tslint:disable-next-line:no-console
    console.log(url);
    res.redirect(url);
};

/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
export let saveTokens =  async (req: Request, res: Response, next: NextFunction) => {

    // tslint:disable-next-line:no-console
    console.log(req.query);

    oauth2Client.getToken(req.query.code, async (err, tokens) => {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            const youtubes = await YouTube.find();
            let youtube;
            if (youtubes.length) {
                youtube = youtubes[0];
            } else {
                youtube = new YouTube();
            }
            youtube.accessToken = tokens.access_token;
            youtube.refreshToken = tokens.refresh_token;
            await youtube.save();
            if (youtube.id) {
                return res.json({ youtube });
            } else {
                return res.json({ message: "Hiba tortent a YouTube tokenek mentese kozben." });
            }
        }
    });

};

/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
export let upload =  async (req: Request, res: Response, next: NextFunction) => {

    const tokens = await YouTube.findOneById(1);
    oauth2Client.setCredentials({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
    });

    // initialize the Youtube API library
    const youtube = google.youtube({
        auth: oauth2Client,
        version: "v3",
    });

    // very basic example of uploading a video to youtube
    function runSample(fileName: string, callback: any) {
        const fileSize = fs.statSync(fileName).size;
        youtube.videos.insert({
        part: "id,snippet,status",
        // tslint:disable-next-line:object-literal-sort-keys
        notifySubscribers: false,
        resource: {
            snippet: {
            title: req.body.cim,
            // tslint:disable-next-line:object-literal-sort-keys
            description: req.body.leiras,
            },
            status: {
            privacyStatus: "private",
            },
        },
        media: {
            body: fs.createReadStream(fileName),
        },
        }, {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: (evt: any) => {
            const progress = (evt.bytesRead / fileSize) * 100;
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            console.log(`${Math.round(progress)}% complete`);
        },
        }, (err, res) => {
        if (err) {
            throw err;
        }
        console.log("\n\n");
        console.log(res.data);
        return res.json({ data: res.data });
        });
    }

    runSample(process.env.SERVER_VIDEOS_PATH + "/" + req.body.video, () => { /* sample complete */ });
};
