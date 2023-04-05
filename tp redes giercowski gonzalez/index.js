"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var video_1 = require("./video");
var vista_1 = require("./vista");
var swagger_ui_express_1 = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");
var app = (0, express_1.default)();
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.get('/', function (req, res) {
    res.render('index');
});
app.set('view engine', 'ejs');
var videos = new Array;
var videoTemp = new video_1.video(0, "1", 54, "imagen Base sesenta y cuatro", new Array, "usuarioAlpha");
videos.push(videoTemp);
app.get("/videos", function (_req, _res) {
    _res.json(videos);
});
// subir video
app.post("/videos/:id/:titulo/:duracion/:miniatura/:usuario", function (_req, _res) {
    var videoASubir = new video_1.video(Number(_req.params.id), _req.params.titulo, Number(_req.params.duracion), _req.params.miniatura, [], _req.params.usuario);
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
//modificar video
app.put("/videos/:id/:titulo/:duracion/:miniatura/:usuario", function (_req, _res) {
    var p = videos.find(function (item) {
        return item.id == Number(_req.params.id);
    });
    if (p) {
        p.titulo = _req.params.titulo;
        p.duracion = Number(_req.params.duracion);
        p.miniatura = _req.params.miniatura;
        p.usuario = _req.params.usuario;
    }
    _res.json(p);
});
//añadir vista
app.post("/vistas/:id/:idVideo/:duracion/:ubicacion/:fecha", function (_req, _res) {
    var vistaASubir = new vista_1.vista(Number(_req.params.id), Number(_req.params.idVideo), Number(_req.params.duracion), _req.params.ubicacion, _req.params.fecha);
    var v = 0;
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].id == vistaASubir.idVideo) {
            v = i;
        }
    }
    videos[v].listaVistas.push(vistaASubir);
    _res.json(204).send();
});
app.listen(1814, function () {
    console.log("Messsi nashe");
});
//quitar vista
app.delete("/vistas/:idVisita", function (_req, _res) {
    for (var i = 0; i < videos.length; i++) {
        for (var j = 0; j < videos[i].listaVistas.length; j++) {
            if (videos[i].listaVistas[j].idVista == Number(_req.params.idVisita)) {
                videos[i].listaVistas.splice(j, 1);
            }
        }
    }
    _res.status(204).send();
});
//modificar vista 
app.put("/vistas/:idVista/:id/:idVideo/:duracion/:ubicacion/:fecha", function (_req, _res) {
    var vistaACambiar = new vista_1.vista(Number(_req.params.id), Number(_req.params.idVideo), Number(_req.params.duracion), _req.params.ubicacion, _req.params.fecha);
    for (var i = 0; i < videos.length; i++) {
        for (var j = 0; j < videos[i].listaVistas.length; j++) {
            if (videos[i].listaVistas[j].idVista == Number(_req.params.idVista)) {
                videos[i].listaVistas[j] = vistaACambiar;
            }
        }
    }
    _res.status(204).send();
});
//métodos personalizados
//mostrar videos con cierta cantidad de vistas o más
app.get("/verVideosXVistas/:cantMinima", function (_req, _res) {
    var videosXvisitas = new Array;
    for (var i = 0; i < videos.length; i++) { //drakul20
        if (videos[i].listaVistas.length >= Number(_req.params.cantMinima)) {
            videosXvisitas.push(videos[i]);
        }
    }
    _res.json(videosXvisitas);
});
//mostrar vistas de los videos
app.get("/verVistasVideos", function (_req, _res) {
    var vistasDeVideos = /** @class */ (function () {
        function vistasDeVideos(tit, cant) {
            this.titulo = tit;
            this.cantidadVisitas = cant;
        }
        return vistasDeVideos;
    }());
    var listaItems = new Array;
    for (var i = 0; i < videos.length; i++) {
        var itemLista = new vistasDeVideos(videos[i].titulo, videos[i].listaVistas.length);
        listaItems.push(itemLista);
    }
    _res.json(listaItems);
});
// mostrar videos con mas vistas
app.get("/verVideoMasLargo", function (_req, _res) {
    var masLargo = new video_1.video(-1, "", 0, "", [], "");
    var lista = new Array;
    for (var i = 0; i < videos.length; i++) {
        if (videos[i].duracion > masLargo.duracion) {
            lista = [];
            lista.push(videos[i]);
            masLargo = videos[i];
        }
        else if (videos[i].duracion == masLargo.duracion) {
            lista.push(videos[i]);
        }
    }
    _res.json(lista);
});
