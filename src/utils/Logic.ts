// Helper Function and stuff

export const isValidCreateAccount = (email: string, password: string, confirmpassword: string): object => {
    const isLongEnough = password.length >= 8;
    const specialCharRegex = /[`!@$%^&*()_+`\-=[\]';./,]/;
    const emailRegex = /\.(com|net|org|io)$/i;
    const hasEmailRegex = emailRegex.test(email);
    const hasSpecialChar = specialCharRegex.test(password);

    if (email == "" || password == "" || confirmpassword == "") {
        return {
            isSuccess: false,
            errorMessage: "Input a Value. "
        }
    }

    if (password != confirmpassword) {
        return {
            isSuccess: false,
            errorMessage: "Password do not match. "
        }
    }

    if (!isLongEnough) {
        return {
            isSuccess: false,
            errorMessage: "Password is Short"
        }
    }

    if (!hasSpecialChar) {
        return {
            isSuccess: false,
            errorMessage: "Try a stronger password"
        }
    }

    if (isLongEnough && hasSpecialChar && hasEmailRegex) {
        return {
            isSuccess: true,
            errorMessage: ""
        }
    }

    return {
        isSuccess: false,
        errorMessage: ""
    }
}

