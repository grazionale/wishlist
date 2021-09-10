export interface IUserService {
  create: (user: IUserService.CreateParams) => Promise<IUserService.CreateResult>
}

export namespace IUserService {
  export type CreateParams = {
    username: string
    password: string
  }

  export type CreateResult = {
    id: number
    username: string
  }
}
