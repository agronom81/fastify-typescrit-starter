import { FastifyInstance } from 'fastify';
import { userRoutes } from './v1/users';

export const apiV1Routes = async (app: FastifyInstance) => {
    app.register(userRoutes, { prefix: 'users' });
    app.get('/', async (request, reply) => {
        return {
            message: 'Fastify API is on fire! 🔥',
        };
    });
};
