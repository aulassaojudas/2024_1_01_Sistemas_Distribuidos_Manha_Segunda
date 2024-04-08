const PerfilDTO = require("./perfil.dto");
const UserDTO = require("./perfil.dto");
const PerfilService = require("./perfil.service");
const perfilService = new PerfilService();

class PerfilController {
  getAllPerfis(req, res) {
    const perfils = perfilService.findAll();
    res.json(perfils);
  }

  createPerfil(req, res) {
    req.body.user_id = req.params.user_id;
    const perfilDTO = new PerfilDTO(req.body);
    const perfil = perfilService.create(perfilDTO);
    res.json(perfil);
  }

  getPerfilById(req, res) {
    const { user_id } = req.params;
    const perfil = perfilService.findOne(user_id);
    if (!perfil) {
      return res.status(404).send("register not found");
    }
    res.json(perfil);
  }

  getPerfilEndById(req, res) {
    const { user_id, address_id } = req.params;
    const perfil = perfilService.findEndOne(user_id, address_id);
    if (!perfil) {
      return res.status(404).send("register not found");
    }
    res.json(perfil);
  }

  updatePerfil(req, res) {
    req.body.user_id = req.params.user_id;
    req.body.address_id = req.params.address_id
    const updatePerfil = perfilService.update(new PerfilDTO(req.body));
    if (!updatePerfil) return res.status(404).send("register not found");
    res.status(200).json(updatePerfil);
  }

  deletePerfil(req, res) {
    const { user_id, address_id } = req.params;
    const deleteUser = perfilService.remove(user_id, address_id);
    if (!deleteUser) return res.status(404).send("register not found");
    res.status(204).send("Deleted record");
  }
}

module.exports = PerfilController;
