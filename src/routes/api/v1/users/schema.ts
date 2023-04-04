const bodyAuthSchema = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: { type: 'string' },
        rememberMe: { type: 'boolean' },
    },
    required: ['email', 'password'],
    errorMessage: {
        required: {
            email: 'email is required.',
            password: 'password is required.',
        },
        properties: {
            email: 'should be match a email.',
        },
    },
};

const userProperties = {
    id: { type: 'number' },
    email: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string' },
};

const responseAuthSchema = {
    status: { type: 'boolean' },
    token: { type: 'string' },
    user: {
        type: 'object',
        properties: userProperties,
    },
};

export const authSchema = {
    tags: ['user'],
    body: bodyAuthSchema,
    response: {
        200: {
            type: 'object',
            properties: responseAuthSchema,
        },
    },
};
