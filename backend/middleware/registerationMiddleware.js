const validator = require("email-validator")

const checkPasswordReq = (password) => {
    // Password requirements
    //  Must include a number
    //  Must be 8 characters or longer
    //  Must contain at least one character
    const minLength = 8 
    const hasCharacter = /[a-zA-Z]/.test(password) 
    const hasNumber = /\d/.test(password) 

    if (
        password.length >= minLength &&
        hasCharacter &&
        hasNumber
    ) {
        return true 
    } else {
        return false 
    }
}

const emailIsValid = (email) => {
    return validator.validate(email)
  };
  

module.exports = {
    checkPasswordReq,
    emailIsValid
}