"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Mi API',
            version: '1.0.0',
            description: 'Descripción de mi API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(options);
function swaggerConfig() {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
}
exports.swaggerConfig = swaggerConfig;
