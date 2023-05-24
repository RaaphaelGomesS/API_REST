import { Router } from "express";
import UserController from "../controllers/UserController";
import loginRequired from "../middleware/loginRequired";

const router = new Router();

router.post("/", UserController.create);
router.put("/", loginRequired, UserController.update);
router.delete("/", loginRequired, UserController.delete);

export default router;
