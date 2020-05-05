const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateKeepInput(data) {
    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    data.links = !isEmpty(data.links) ? data.links : "";
    // Name checks
    if (Validator.isEmpty(data.title)) {
        errors.name = "Name field is required";
    }
    // Description checks
    if (Validator.isEmpty(data.description)) {
        errors.email = "Description field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};