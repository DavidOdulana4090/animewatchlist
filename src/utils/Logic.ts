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
            Message: "Input a Value. "
        }
    }

    if (password != confirmpassword) {
        return {
            isSuccess: false,
            Message: "Password do not match. "
        }
    }

    if (!isLongEnough) {
        return {
            isSuccess: false,
            Message: "Password is Short"
        }
    }

    if (!hasSpecialChar) {
        return {
            isSuccess: false,
            Message: "Try a stronger password"
        }
    }

    if (isLongEnough && hasSpecialChar && hasEmailRegex) {
        return {
            isSuccess: true,
            Message: ""
        }
    }

    return {
        isSuccess: false,
        Message: ""
    }
}

