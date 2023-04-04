import { FastifyRequest } from 'fastify/types/request';
import { UserType } from '../types';

export type TAuthRequest = FastifyRequest<{
    Body: UserType;
}>;
