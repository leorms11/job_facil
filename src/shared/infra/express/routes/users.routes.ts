import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { Router } from "express";

const userRouter = Router();
const createUserController = new CreateUserController();

userRouter.post("/", createUserController.handle);

export { userRouter };
