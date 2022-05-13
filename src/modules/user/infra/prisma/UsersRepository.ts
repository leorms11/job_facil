import { ICreateUser } from "@modules/user/interfaces/ICreateUser";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { User } from "@prisma/client";

import { prisma } from "@shared/infra/prisma";

class UsersRepository implements IUsersRepository {
  constructor() {}

  async create(data: ICreateUser): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async findByCpf(cpf: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    return user;
  }
}

export { UsersRepository };
