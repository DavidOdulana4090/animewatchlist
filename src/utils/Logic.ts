// Helper Function and stuff

export const isValidLogin = (email: string, password: string): boolean => {
    const isValidEmail = email.toLowerCase().endsWith(".com");

    const isLongEnough = password.length >= 8;
    const specialCharRegex = /[`!@$%^&*()_+`\-=[\]';./,]/;
    const hasSpecialChar = specialCharRegex.test(password);

    return isValidEmail && isLongEnough && hasSpecialChar;
}

export const isValidCreateAccount = (email: string, password: string, confirmpassword: string): boolean => {
    
    return true;
}

export const isMatchingPassword = (password: string, secondpassword: string): boolean => {
    if (password === secondpassword) {
        return true;
    } else {
        return false;
    }
}