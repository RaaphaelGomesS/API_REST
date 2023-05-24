"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: [
        "id",
        "name",
        "lastName",
        "email",
        "age",
        "weight",
        "height",
      ],
      order: [
        ["id", "ASC"],
        [_Photo2.default, "id", "DESC"],
      ],
      include: {
        model: _Photo2.default,
        attributes: ["id", "url", "filename"],
      },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Faltando ID"] });
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          "id",
          "name",
          "lastName",
          "email",
          "age",
          "weight",
          "height",
        ],
        order: [
          ["id", "ASC"],
          [_Photo2.default, "id", "DESC"],
        ],
        include: {
          model: _Photo2.default,
          attributes: ["id", "url", "filename"],
        },
      });

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe."] });
      }

      return res.json(aluno);
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async create(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);

      return res.json({ msg: "Aluno criado!", aluno: aluno });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: _optionalChain([error, 'access', _ => _.errors, 'optionalAccess', _2 => _2.map, 'call', _3 => _3((err) => err.message)]) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Faltando ID"] });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe."] });
      }

      const newAluno = await aluno.update(req.body);

      return res.json({ msg: "Aluno atualizado!", aluno: newAluno });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Faltando ID"] });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(400).json({ errors: ["Aluno não existe."] });
      }

      await aluno.destroy();
      return res.json({ msg: "Aluno deletado!" });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

exports. default = new AlunoController();
