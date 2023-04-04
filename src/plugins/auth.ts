import { FastifyRequest } from 'fastify/types/request';
import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance } from 'fastify/types/instance';
import fastifyJwt from '@fastify/jwt';
import { fromEnv } from '../utils';
import { FastifyReply } from 'fastify/types/reply';

export default fastifyPlugin(async function (fastify: FastifyInstance) {
    fastify.register(fastifyJwt, {
        secret: fromEnv('SECRET'),
        messages: {
            badRequestErrorMessage: 'Format is Authorization: Bearer [token]',
            noAuthorizationInHeaderMessage: 'Autorization header is missing!',
            authorizationTokenExpiredMessage: 'Authorization token expired',
            authorizationTokenInvalid: (err) => {
                return `Authorization token is invalid: ${err.message}`;
            },
        },
    });

    fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});
