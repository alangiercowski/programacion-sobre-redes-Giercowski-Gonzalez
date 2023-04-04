import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const app = express();

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

const specs = swaggerJsdoc(options);

export function swaggerConfig() {
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}