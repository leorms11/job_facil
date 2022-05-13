import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { validate } from "class-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { normalizeCpf, normalizePhone } from "@shared/utils/StringHelpers";
import { getErrors } from "@shared/utils/ValidatorsHelpers";

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  occupation: string;
  phone: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private readonly usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    confirmPassword,
    cpf,
    occupation,
    phone,
  }: IRequest): Promise<void> {
    if (password !== confirmPassword) throw new AppError("As senhas devem ser iguais!");

    const userDto = new CreateUserDTO({
      name,
      email,
      password: await hash(password, 8),
      cpf: normalizeCpf(cpf),
      occupation,
      phone: normalizePhone(phone),
    });

    const errors = getErrors(await validate(userDto));
    if (errors) throw new AppError("Erro no preenchimento dos dados", 400, errors);

    const existentUserEmail = await this.usersRepository.findByEmail(userDto.email);
    if (existentUserEmail) throw new AppError("Email já cadastrado!");

    const existentUserCpf = await this.usersRepository.findByCpf(userDto.cpf);
    if (existentUserCpf) throw new AppError("CPF já cadastrado!");

    await this.usersRepository.create(userDto);
  }
}

export { CreateUserUseCase };
