export interface IAuthService {
  auth: (account: IAuthService.Params) => Promise<IAuthService.Result>
}

export namespace IAuthService {
  export type Params = {
    username: string
    password: string
  }

  export type Result = {
    user: string
    accessToken: string
  }
}
