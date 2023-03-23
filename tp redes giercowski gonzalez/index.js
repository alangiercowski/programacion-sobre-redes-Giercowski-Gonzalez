"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var video_1 = require("./video");
var vista_1 = require("./vista");
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.render('index');
});
var videos = new Array;
var vistas = new Array;
var videoTemp = new video_1.video(0, "1", "00:00", "imagen Base sesenta y cuatro");
videos.push(videoTemp);
var vistaTemp = new vista_1.vista(0, "1:00", "Argentina, CABA", "2015-01-13");
vistas.push(vistaTemp);
app.get("/videos", function (_req, _res) {
    _res.json(videos);
});
app.get("/vistas", function (_req, _res) {
    _res.json(vistas);
});
// subir video
app.post("/videos", function (_req, _res) {
    var videoTemp = new video_1.video(0, "2", "01:01", "imagen Base sesenta y cuatro");
    videos.push(videoTemp);
    _res.json(videos);
});
// eliminar video
app.delete("/videos/:id", function (_req, _res) {
    var p = videos.find(function (item) {
        return item.id == Number(_req.params.id);
    });
    if (p) {
        delete videos[videos.indexOf(p)];
    }
    _res.status(204).send();
});
app.set('view engine', 'ejs');
app.listen(1814, function () {
    console.log("Messsi nashe");
});
