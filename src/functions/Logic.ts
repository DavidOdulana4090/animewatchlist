// Helper Function and stuff

export const ValidateLogin = (email: string, password: string) => {
    const isValidEmail = email.toLowerCase().endsWith(".com");

    const isLongEnough = password.length >= 8;
    const specialCharRegex = /[`!@$%^&*()_+`\-=[\]';./,]/;
    const hasSpecialChar = specialCharRegex.test(password);

    return isValidEmail && isLongEnough && hasSpecialChar;
}