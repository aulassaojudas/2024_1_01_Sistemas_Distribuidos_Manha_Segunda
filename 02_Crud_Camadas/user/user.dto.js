const { v4: uuidv4 } = require("uuid");

class UserDTO {
    constructor({ user_id, user_email, user_password }, criar = false) {
        if(criar) {
            this.user_id = uuidv4();
        } else {
            this.user_id = user_id;
        }
        this.setEmail(user_email);
        this.setPassword(user_password);
    }

    setEmail(user_email) {
        if(!/\S+@\S+\.\S+/.test(user_email)){
            throw new Error("email invalido");
        }
        this.user_email = user_email;
    }

    setPassword(user_password){
        if(user_password.length < 8) {
            throw new Error("o tamanho minimo da senha é de 8 caracteres");
        }
        if(!/[A-Z]/.test(user_password)){
            throw new Error("é necessário ter no minimo um caracter maiusculo");
        }
        if(!/[a-z]/.test(user_password)){
            throw new Error("é necessário ter no minimo um caracter minusculo");
        }
        if(!/\d/.test(user_password)){
            throw new Error("é necessário ter no minimo um número");
        }
        if(!/[@!$#&]/.test(user_password)){
            throw new Error("é necessário ter no minimo um caracter especial");
        }
        this.user_password = user_password;
    }
}

module.exports = UserDTO;
