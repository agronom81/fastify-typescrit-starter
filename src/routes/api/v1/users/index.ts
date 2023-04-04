import { FastifyInstance, FastifyReply } from 'fastify';

import { validatorCompiler } from '../../../../validators/ajv';
import {
    authSchema,
} from './schema';
import { UsersService } from '../../../../services/users';
import {
    UserType,
} from '../../../../types';

export const userRoutes = async (app: FastifyInstance) => {
    const usersService = new UsersService(app);

    app.post<{ Body: UserType; Reply: FastifyReply }>(
        '/login',
        { schema: authSchema, validatorCompiler },
        usersService.auth,
    );
};
