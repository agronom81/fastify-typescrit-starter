import { FastifyInstance } from 'fastify/types/instance';

export class Base {
    app;
    knex;

    constructor(app: FastifyInstance) {
        if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
        this.app = app;

        const { knex } = this.app;

        if (!knex) {
            const err = new Error();
            // err.statusCode = 500;
            // err.status = false;
            err.message = 'An error occurred, please try again later.';
            throw err;
        }
        this.knex = knex;
    }
}
