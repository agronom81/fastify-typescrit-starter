import { FastifyInstance } from 'fastify/types/instance';
import { Knex } from 'knex';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => void;
        knex: Knex
    }
}
