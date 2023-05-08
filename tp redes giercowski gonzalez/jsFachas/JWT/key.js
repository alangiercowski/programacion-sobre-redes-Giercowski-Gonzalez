"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.SECRET_KEY = void 0;
exports.SECRET_KEY = "catALEJO";
const jwt = require("jsonwebtoken");
function verifyToken(_req, _res, next) {
    const token = _req.headers.authorization;
    console.log(token);
    if (!token) {
        return _res
            .status(401)
            .send({ message: "Unauthorized: No token provided." });
    }
    try {
        const decoded = jwt.verify(token, exports.SECRET_KEY);
        _req.usuario = decoded;
        console.log("verificación exitosa :D");
        next();
    }
    catch (err) {
        return _res.status(401).send({ message: "Unauthorized: Invalid token." });
    }
}
exports.verifyToken = verifyToken;
