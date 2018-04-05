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
const jwt = require("jsonwebtoken");
const Epizod_1 = require("../entity/Epizod");
const YouTube_1 = require("../entity/YouTube");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const oauth2Client = new OAuth2("15446227899-uo4u0njei3sf26b7r3qmu9hbqide94h3.apps.googleusercontent.com", "sW0B-dppq2AIl3tn0IxDwl9C", "http://localhost:3000/youtube/save-tokens");
/**
 * GET /youtube
 * Egy hir.
 */
exports.getSettings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const youtube = yield YouTube_1.YouTube.findOne();
    if (youtube.id) {
        return res.json({ youtube });
    }
    else {
        return res.json({ message: "Hiba tortent a beallitasok lekerdezese kozben. Kerem probalja ujra kesobb." });
    }
});
/**
 * PUT /hirek
 * Hir modositasa.
 */
exports.editSettings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const youtube = yield YouTube_1.YouTube.findOneById(req.body.id);
    youtube.accessToken = req.body.accessToken;
    youtube.refreshToken = req.body.refreshToken;
    yield youtube.save();
    if (youtube.id) {
        return res.json({ youtube });
    }
    else {
        return res.json({ message: "Hiba tortent a beallitasok modositasa kozben. Kerem probalja ujra kesobb." });
    }
});
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
    const youtubeTokens = yield YouTube_1.YouTube.findOne();
    oauth2Client.setCredentials({
        access_token: youtubeTokens.accessToken,
        refresh_token: youtubeTokens.refreshToken,
        // tslint:disable-next-line:object-literal-sort-keys
        expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7),
    });
    oauth2Client.refreshAccessToken((err, tokens) => {
        // your access_token is now refreshed and stored in oauth2Client
        // store these new tokens in a safe place (e.g. database)
        // tslint:disable-next-line:no-console
        console.log(err, tokens);
        youtubeTokens.accessToken = tokens.access_token;
        youtubeTokens.save();
        oauth2Client.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            // tslint:disable-next-line:object-literal-sort-keys
            expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7),
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
                    // process.stdout.clearLine();
                    // process.stdout.cursorTo(0);
                    // console.log(`${Math.round(progress)}% complete`);
                },
            }, (err, res) => {
                if (err) {
                    throw err;
                }
                fs.unlink(fileName, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        throw error;
                    }
                    // tslint:disable-next-line:no-console
                    console.log("Deleted video from server");
                    const epizod = yield Epizod_1.Epizod.findOne({ video: req.body.video });
                    epizod.video = "";
                    epizod.save();
                }));
                // console.log("\n\n");
                // console.log(res.data);
                callback(res.data);
            });
        }
        const data = runSample(process.env.SERVER_VIDEOS_PATH + "/" + req.body.video, (data) => {
            res.json({ data });
        });
    });
    // return res.json({ data });
});
/**
 * PUT /hirek
 * Hir modositasa.
 */
exports.deleteSettings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // tslint:disable-next-line:no-console
    console.log(req.headers);
    const token = req.headers.authorization.toString().replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
        }
    });
    const youtube = yield YouTube_1.YouTube.findOne();
    youtube.accessToken = "";
    youtube.refreshToken = "";
    yield youtube.save();
    if (!youtube.accessToken) {
        return res.json({ youtube });
    }
    else {
        return res.json({ message: "Hiba tortent a beallitasok torlese kozben. Kerem probalja ujra kesobb." });
    }
});
//# sourceMappingURL=youtube.js.map