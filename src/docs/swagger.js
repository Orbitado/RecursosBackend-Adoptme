import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoptme API',
      version: '1.0.0',
      description: 'API documentation for the Adoptme application',
      contact: {
        name: 'API Support',
        email: 'support@adoptme.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/docs/*.yaml', './src/routes/*.js'],
};

const specs = swaggerJSDoc(swaggerOptions);

export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(specs); 