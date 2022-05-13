import { IsEmail, IsInt } from "class-validator";

import { IsValidCpf, IsValidString } from "@shared/utils/ValidatorsHelpers";

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

  @IsValidString({ message: "O campo 'Nome' é obrigatório!" })
  name: string;

  @IsValidString({ message: "O campo 'Nome' é obrigatório!" })
  @IsEmail({}, { message: "O campo 'E-mail' inválido!" })
  email: string;

  @IsValidString({ message: "O campo 'Senha' é obrigatório!" })
  password: string;

  @IsValidString({ message: "O campo 'CPF' é obrigatório!" })
  @IsValidCpf({ message: "O campo 'CPF' inválido!" })
  cpf: string;

  @IsValidString({ message: "O campo 'Ocupação' é obrigatório!" })
  occupation: string;

  @IsValidString({ message: "O campo 'Celular' é obrigatório!" })
  phone: string;
}

export { CreateUserDTO };
