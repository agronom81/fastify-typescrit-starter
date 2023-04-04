import fastifyPlugin from 'fastify-plugin';
import { FastifyInstance, FastifyListenOptions } from 'fastify/types/instance';

export default fastifyPlugin(
    (fastify: FastifyInstance, options: FastifyListenOptions, next: any) => {
        fastify.addHook('onError', (request, reply, error, done) => {
            done();
        });

        fastify.addHook('onClose', (instance) => {
            const { knex } = instance;
            knex.destroy(() => instance.log.info('knex pool destroyed.'));
        });

        next();
    },
);
