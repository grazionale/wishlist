export interface IClientService {
  index: () => Promise<IClientService.IndexResult[]>
  show: (clientId: string) => Promise<IClientService.ShowResult>
  create: (client: IClientService.CreateParams) => Promise<IClientService.CreateResult>
  update: (client: IClientService.UpdateParams) => Promise<IClientService.UpdateResult>
  delete: (clientId: number) => Promise<string>
}

export namespace IClientService {
  export type IndexResult = {
    id: number
    name: string
    email: string
  }

  export type ShowResult = {
    id: number
    name: string
    email: string
  }

  export type CreateParams = {
    name: string
    email: string
  }

  export type CreateResult = {
    id: number
    name: string
    email: string
  }

  export type UpdateParams = {
    id: number
    name: string
    email: string
  }

  export type UpdateResult = {
    id: number
    name: string
    email: string
  }
}
