export interface IUserRepository {
  findByUsername: (username: string) => Promise<IUserRepository.FindByUsernameResult | undefined>
  create: (user: IUserRepository.CreateParams) => Promise<IUserRepository.CreateResult>
}

export namespace IUserRepository {
  export type FindByUsernameResult = {
    id: number
    username: string
    password: string
  }

  export type CreateParams = {
    username: string
    password: string
  }

  export type CreateResult = {
    id: number
    username: string
  }
}
