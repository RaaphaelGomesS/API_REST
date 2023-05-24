"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async create(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
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
      const user = await _User2.default.findByPk(req.userId);

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
      const user = await _User2.default.findByPk(req.userId);

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

exports. default = new UserController();
