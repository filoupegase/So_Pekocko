const passwordValidator = require('password-validator');        // importation du paquet password validator

const passwordSchema = new passwordValidator();     // Schéma de mot de passe

passwordSchema
    .is().min(8)
    .is().max(42)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin123', 'Adminadmin']); // Blacklist de certain mot de passe

//console.log(passwordSchema.validate('joke', { list: true }));

module.exports = passwordSchema;