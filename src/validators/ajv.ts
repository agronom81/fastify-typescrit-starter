import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';

type TValidator = {
    schema: any;
};

const ajv = new Ajv({
    allErrors: true,
    $data: true,
});

ajvErrors(ajv);
ajvFormats(ajv);
ajvKeywords(ajv);

export const validatorCompiler = ({ schema }: TValidator) => ajv.compile(schema);
