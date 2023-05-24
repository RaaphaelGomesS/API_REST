import multer from "multer";
import multerConfig from "../config/multer";
import Photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const aluno_id = req.body.aluno_id;
        const photo = await Photo.create({ originalname, filename, aluno_id });

        return res.json({
          id: photo.id,
          url: photo.url,
          originalname: photo.originalname,
          filename: photo.filename,
          aluno_id: photo.aluno_id,
        });
      } catch (error) {
        return res.status(400).json({ errors: ["Aluno não existe"] });
      }
    });
  }
}

export default new PhotoController();
