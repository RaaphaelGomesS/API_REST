import { Router } from "express";
import photoController from "../controllers/PhotoController";
import loginRequired from "../middleware/loginRequired";

const router = new Router();

router.post("/", loginRequired, photoController.create);

export default router;
