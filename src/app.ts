import fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import pino from 'pino';
import fastifyCors from '@fastify/cors';
import { fromEnv } from './utils';
import { apiV1Routes } from './routes/api';
import hooks from './hooks';
import db from './plugins/db';
import auth from './plugins/auth';

const logsConfig = {
    formatters: {
        level(level: string) {
            return { level };
        },
    },
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
    level: fromEnv('LOG_LEVEL'),
};

const logger: Record<string, unknown> = {
    development: pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        },
    }),
    staging: logsConfig,
    production: logsConfig,
};

export const build = async () => {
    const server = fastify({
        bodyLimit: 1048576 * 2,
        logger: logger[fromEnv('NODE_ENV')] ?? true,
    }).withTypeProvider<TypeBoxTypeProvider>();

    await server.register(fastifyCors, { origin: '*' });
    await server.register(db);
    await server.register(auth);
    await server.register(hooks);
    await server.register(apiV1Routes, { prefix: 'api/v1' });

    server.setNotFoundHandler((request, reply) => {
        server.log.debug(`Route not found: ${request.method}:${request.raw.url}`);

        reply.status(404).send({
            statusCode: 404,
            error: 'Not found',
            message: `Route ${request.method}:${request.raw.url} not found`,
        });
    });

    server.setErrorHandler((err, request, reply) => {
        server.log.debug(`Request url: ${request.raw.url}`);
        server.log.debug(`Payload: ${request.body}`);
        server.log.error(`Error occurred: ${err}`);

        const code = err.statusCode ?? 500;

        reply.status(code).send({
            status: false,
            statusCode: code,
            error: err.name ?? 'INTERNAL SERVER ERROR',
            message: err.message ?? err,
        });
    });

    return server;
};
