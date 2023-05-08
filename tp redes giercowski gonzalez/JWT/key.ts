import { tokenToString } from "typescript";

export const SECRET_KEY = "catALEJO";
const jwt = require("jsonwebtoken");
export function verifyToken(req: any, res: any, next: any) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res
            .status(401)
            .send({ message: "Unauthorized: No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        console.log("verificación exitosa :D");
        next();
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized: Invalid token." });
    }
}
