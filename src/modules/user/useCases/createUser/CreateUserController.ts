import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirmPassword, cpf, occupation, phone } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      password,
      confirmPassword,
      cpf,
      occupation,
      phone,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
