import User from "../models/User";

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID não enviado."] });
      }
      const user = await User.findByPk(req.params.id);
      return res.json({msg: "usuário criado!", user: user});
    } catch (error) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID não enviado."] });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({ errors: ["Usuário não existe."] });
      }

      const newData = await user.update(req.body);

      return res.json({msg: "usuário atualizado!", user: newData});
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ errors: ["ID não enviado."] });
      }
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({ errors: ["Usuário não existe."] });
      }

      await user.destroy()

      return res.json({msg: "usuário deletado!"});
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}



export default new UserController();
