import { User } from "@prisma/client";

import { ICreateUser } from "../interfaces/ICreateUser";

export interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}
