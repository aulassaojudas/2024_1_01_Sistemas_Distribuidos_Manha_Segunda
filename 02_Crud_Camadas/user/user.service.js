const { v4: uuidv4 } = require("uuid");
const User = require("./user.entity.js");
const UserDTO = require("./user.dto.js");
const { GenericException } = require("../generic-exception.js");

const users = [
  {
    user_id: uuidv4(),
    user_email: "teste@teste.com",
    user_password: "123456",
  },
  {
    user_id: uuidv4(),
    user_email: "teste@2teste.com",
    user_password: "123456",
  },
];

class UserService {
  login( user_email, user_password){
    const usuario = users.find((user) => user.user_email === user_email);
    if(usuario <= -1 ) return false;
    return usuario.user_password === user_password;
  }

  findAll() {
    return users.map((user) => new User(user));
  }

  findOne(id) {
    return users.find((user) => user.id === id);
  }
  
  create(UserDTO) {
    users.push(UserDTO);
    return UserDTO;
  }

  update(UserDTO) {
    const userIndex = users.findIndex((user) => user.id === UserDTO.id);
    if (userIndex === -1) return null;
    users[userIndex] = UserDTO;
    return UserDTO;
  }

  remove(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
}

module.exports = UserService;
