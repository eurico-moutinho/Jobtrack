
const emailValidator = (email: string | undefined):boolean => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return email ? emailRegex.test(email) : false;

};

const passwordValidator = (password: string | undefined):boolean => {

    const passwordRegex = /^.{6,}$/;

    return password ? passwordRegex.test(password) : false;

};

const passwordComparison = (pass: string | undefined, confirm: string | undefined) => {

    return pass === confirm;

};

export {emailValidator, passwordValidator, passwordComparison}