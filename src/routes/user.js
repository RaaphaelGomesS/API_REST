import { Router } from "express";
import UserController from "../controllers/UserController";

const router = new Router();

router.post("/", UserController.create);
router.put("/", UserController.update);
router.delete("/", UserController.delete);

export default router;
