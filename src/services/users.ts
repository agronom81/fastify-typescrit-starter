import { boomify } from '@hapi/boom';
import { TAuthRequest } from './users.interface';
import { toBoolean } from '../utils';
import { Base } from './base';
import { UsersRepository } from '../repository/users';
import { FastifyReply, FastifyRequest } from 'fastify';

type TUserValidatePassword = {
    FirstName: string;
    LastName: string;
    email: string;
};

export class UsersService extends Base {
    usersRepository;

    constructor(app) {
        super(app);
        this.usersRepository = new UsersRepository(this.knex);
    }

    auth = async (request: TAuthRequest, reply: FastifyReply) => {
        try {
            const { email, password, rememberMe } = request.body;

            const user = await this.usersRepository.getUserByEmail(email);
            const expiresIn = toBoolean(rememberMe) ? '365d' : '1d';

            const token = await reply.jwtSign(
                    { id: user.id, email: user.email },
                    {
                        expiresIn: expiresIn,
                    },
                );

                reply.send({
                    status: true,
                    token,
                    user,
                });

        } catch (err) {
            throw boomify(err as Error);
        }
    };


}
