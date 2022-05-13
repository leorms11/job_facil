import { ICreateUser } from "@modules/user/interfaces/ICreateUser";
import { User } from "@prisma/client";
import crypto from "node:crypto";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  public users: User[] = [];
  public static INSTANCE: UsersRepositoryInMemory;

  constructor() {}

  public static getInstance(): UsersRepositoryInMemory {
    if (!UsersRepositoryInMemory.INSTANCE) {
      UsersRepositoryInMemory.INSTANCE = new UsersRepositoryInMemory();
    }

    return UsersRepositoryInMemory.INSTANCE;
  }

  async create(data: ICreateUser): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.users.find((user) => user.cpf === cpf);

    return user ?? null;
  }
}

export { UsersRepositoryInMemory };
