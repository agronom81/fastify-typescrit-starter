import { FastifyInstance } from 'fastify/types/instance';
import fastifyPlugin from 'fastify-plugin';
import knex from 'knex';
import { fromEnv } from '../utils';
const dbConnector = async (server: FastifyInstance, options = {}) => {
    const db = knex({
        client: 'mssql',
        connection: {
            server: fromEnv('DB_SERVER'),
            user: fromEnv('DB_USER'),
            password: fromEnv('DB_PASSWORD'),
            database: fromEnv('DB_DATABASE'),
            port: 1433,
            requestTimeout: 600000,
            options: {
                encrypt: true,
            },
        },
        acquireConnectionTimeout: 90000,
        ...options,
    });

    server.decorate('knex', db);
};

export default fastifyPlugin(dbConnector);
