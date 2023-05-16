import User from "../models/User";

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;
      return res.json({ user: { id, nome, email } });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ["Usuário não existe."] });
      }

      const newData = await user.update(req.body);
      const { id, nome, email } = newData;

      return res.json({
        msg: "usuário atualizado!",
        user: { id, nome, email },
      });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ["Usuário não existe."] });
      }

      await user.destroy();

      return res.json({ msg: "usuário deletado!" });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
