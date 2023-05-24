import Aluno from "../models/Aluno";
import Photo from "../models/Photo";

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
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
        [Photo, "id", "DESC"],
      ],
      include: {
        model: Photo,
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

      const aluno = await Aluno.findByPk(id, {
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
          [Photo, "id", "DESC"],
        ],
        include: {
          model: Photo,
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
      const aluno = await Aluno.create(req.body);

      return res.json({ msg: "Aluno criado!", aluno: aluno });
    } catch (error) {
      return res
        .status(400)
        .json({ errors: error.errors?.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["Faltando ID"] });
      }

      const aluno = await Aluno.findByPk(id);

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

      const aluno = await Aluno.findByPk(id);

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

export default new AlunoController();
