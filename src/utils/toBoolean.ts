export const toBoolean = (value: unknown) => {
    if (value === undefined) {
        return false;
    }

    const val = typeof value === 'string' ? value.trim() : value;
    if (val === 'false' || val === '0' || val === 0 || val === false || val === '') {
        return false;
    }

    return true;
};
