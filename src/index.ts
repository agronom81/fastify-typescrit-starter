import { FastifyInstance, FastifyListenOptions } from 'fastify/types/instance';
import { build } from './app';
import { fromEnv } from './utils';
import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';

const NODE_ENV = process.env.NODE_ENV;

const opts: FastifyListenOptions = {
    port: fromEnv('APP_PORT') ? +fromEnv('APP_PORT') : 80,
};

if (NODE_ENV !== 'development') {
    opts.host = '0.0.0.0';
}

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (deadWorker) => {
        // Restart the worker
        const worker = cluster.fork();

        // Note the process IDs
        const newPID = worker.process.pid;
        const oldPID = deadWorker.process.pid;

        // Log the event
        console.log('worker ' + oldPID + ' died.');
        console.log('worker ' + newPID + ' born.');
    });
} else {
    build()
        .then((app: FastifyInstance) => {
            app.listen(opts, function (err) {
                if (err) {
                    app.log.error(err);
                    process.exit(1);
                }

                process.on('SIGINT', () => app.close());
                process.on('SIGTERM', () => app.close());
            });
        })
        .catch((err: Error) => console.log(err));

    console.log(`Worker ${process.pid} started`);
}
