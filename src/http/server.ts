import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import { errorHandler } from './error-handler'
import { router } from './router'

const app = fastify()

/* ======================== CONFIGURATION ======================== */

const host = process.env.HOST || 'http://localhost'
const port = Number(process.env.PORT) || 3333

dotenv.config()

app.register(cors, {
  origin: [
    'https://sorteio.ioiolanches.com.br',
    'https://ioiolanches-sorteio-web.vercel.app',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

/* ======================== SWAGGER CONFIG ======================== */

const theme = new SwaggerTheme()
const content = theme.getBuffer(SwaggerThemeNameEnum.DARK)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Ioio lanches API',
      description: 'Ioio lanches API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  theme: {
    css: [
      {
        filename: 'theme.css',
        content,
      },
    ],
  },
})

/* ======================== VALIDATOR CONFIG ======================== */

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

/* ======================== ERROR HANDLER CONFIG ======================== */

app.setErrorHandler(errorHandler)

/* ======================== ROUTES ======================== */

app.register(router)

app.get('/', async (request, reply) => {
  reply.send({
    application: 'Ioio lanches API',
    version: '1.0.0',
    documentation: `${host}:${port}/docs`,
  })
})

/* ======================== SERVER START ======================== */

app.listen({ port }, () => {
  console.log(`Servidor do sorteio está rodando, ${host}:${port}/docs`)
})
