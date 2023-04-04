export const validate = (type: string, value: string): { status: boolean; message?: string } => {
    if (!value || typeof value !== 'string') return { status: false };

    if (type === 'email') {
        const tester =
            // eslint-disable-next-line no-useless-escape
            /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const emailParts = value.split('@');
        if (emailParts.length !== 2) return { status: false };

        const account = emailParts[0];
        const address = emailParts[1];

        if (account.length > 64) return { status: false };
        else if (address.length > 255) return { status: false };

        const domainParts = address.split('.');
        if (
            domainParts.some(function (part) {
                return part.length > 63;
            })
        )
            return { status: false };

        return { status: tester.test(value) };
    }

    if (type === 'password') {
        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        // const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{7,}/;
        const nonSpacesRegExp = /^\S*$/;

        const passwordLength = value.length;
        const uppercasePassword = uppercaseRegExp.test(value);
        const lowercasePassword = lowercaseRegExp.test(value);
        // const digitsPassword = digitsRegExp.test(value);
        const specialCharPassword = specialCharRegExp.test(value);
        const minLengthPassword = minLengthRegExp.test(value);
        const nonSpaces = nonSpacesRegExp.test(value);

        let errMsg;
        let status = false;
        if (passwordLength === 0) {
            errMsg = 'Password is empty';
        } else if (!uppercasePassword) {
            errMsg = 'Password must have at least one uppercase';
        } else if (!lowercasePassword) {
            errMsg = 'Password must have at least one lowercase';
            // } else if (!digitsPassword) {
            //     errMsg = 'At least one digit';
        } else if (!specialCharPassword) {
            errMsg = 'Password must have at least one special characters';
        } else if (!minLengthPassword) {
            errMsg = 'Password must have at least minumum 7 characters';
        } else if (!nonSpaces) {
            errMsg = 'Password must not contain spaces';
        } else {
            errMsg = '';
            status = true;
        }

        return { status: status, message: errMsg };
    }

    return { status: false, message: 'Not valid' };
};
