import { IsEmail } from "class-validator";

import { IsValidCpf } from "@shared/utils/ValidatorsHelpers";

import { ICreateUser } from "../interfaces/ICreateUser";

class CreateUserDTO {
  constructor(data: ICreateUser) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.cpf = data.cpf;
    this.occupation = data.occupation;
    this.phone = data.phone;
  }

  name: string;

  @IsEmail({ message: "E-mail inválido!" })
  email: string;

  password: string;

  @IsValidCpf({ message: "CPF inválido!" })
  cpf: string;

  occupation: string;
  phone: string;
}

export { CreateUserDTO };
