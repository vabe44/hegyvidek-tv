"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const googleapis_1 = require("googleapis");
const YouTube_1 = require("../entity/YouTube");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const oauth2Client = new OAuth2("15446227899-uo4u0njei3sf26b7r3qmu9hbqide94h3.apps.googleusercontent.com", "sW0B-dppq2AIl3tn0IxDwl9C", "http://localhost:3000/youtube/save-tokens");
/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
exports.oauth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
    });
    // tslint:disable-next-line:no-console
    console.log(url);
    res.redirect(url);
});
/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
exports.saveTokens = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.query);
    oauth2Client.getToken(req.query.code, (err, tokens) => __awaiter(this, void 0, void 0, function* () {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if (!err) {
            const youtubes = yield YouTube_1.YouTube.find();
            let youtube;
            if (youtubes.length) {
                youtube = youtubes[0];
            }
            else {
                youtube = new YouTube_1.YouTube();
            }
            youtube.accessToken = tokens.access_token;
            youtube.refreshToken = tokens.refresh_token;
            yield youtube.save();
            if (youtube.id) {
                return res.json({ youtube });
            }
            else {
                return res.json({ message: "Hiba tortent a YouTube tokenek mentese kozben." });
            }
        }
    }));
});
/**
 * GET /epizodok VIDEO
 * Epizod video feltoltese.
 */
exports.upload = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const tokens = yield YouTube_1.YouTube.findOneById(1);
    oauth2Client.setCredentials({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
    });
    // initialize the Youtube API library
    const youtube = googleapis_1.google.youtube({
        auth: oauth2Client,
        version: "v3",
    });
    // very basic example of uploading a video to youtube
    function runSample(fileName, callback) {
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
            onUploadProgress: (evt) => {
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
    runSample(process.env.SERVER_VIDEOS_PATH + "/" + req.body.video, () => { });
});
//# sourceMappingURL=youtube.js.map