import { Static, Type } from '@sinclair/typebox';

const User = Type.Object({
    password: Type.String(),
    email: Type.String({ format: 'email' }),
    rememberMe: Type.Boolean(),
});
export type UserType = Static<typeof User>;
