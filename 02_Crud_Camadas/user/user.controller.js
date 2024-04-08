const UserService = require("./user.service");
const UserDTO = require("./user.dto.js");
const userService = new UserService();
const { GenericException } = require("../generic-exception.js");

class UserController {

  login( req, res ){
    if(userService.login(req.body.user_email, req.body.user_password)){
      res.status(200).send({msg: "usuário logado"});
    } else {
      res.status(400).send({msg: "usuário e/ou senha incorreto"})
    }
  }


  createUser(req, res) {
    try {
        res.json(userService.create(new UserDTO(req.body, true)));
    } catch (error) {
        res.status(400).send({err: error.message});
    }
  }

  getAllUsers(req, res) {
    const users = userService.findAll();
    res.json(users);
  }

  getUserById(req, res) {
    const { id } = req.params;
    const user = userService.findOne(id);

    if (!user) {
      return res.status(404).send("register not found");
    }
    res.json(user);
  }

  updateUser(req, res) {
    const userDTO = new UserDTO({ ...req.body, id: req.params.id });
    const updatedUser = userService.update(userDTO);
    if (!updatedUser) return res.status(404).send("User not found");
    res.status(200).json(updatedUser);
  }

  deleteUser(req, res) {
    const { id } = req.params;
    const result = userService.remove(id);
    if (!result) return res.status(404).send("User not found");
    res.status(204).send();
  }
}

module.exports = UserController;
