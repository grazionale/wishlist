export interface IClientRepository {
  index: () => Promise<IClientRepository.IndexResult[]>
  show: (clientId: string) => Promise<IClientRepository.ShowResult | undefined>
  findByEmail: (clientEmail: string) => Promise<IClientRepository.FindByEmailResult | undefined>
  create: (client: IClientRepository.CreateParams) => Promise<IClientRepository.CreateResult>
  update: (client: IClientRepository.UpdateParams) => Promise<IClientRepository.UpdateResult>
  delete: (clientId: number) => Promise<string>
}
export namespace IClientRepository {
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

  export type FindByEmailResult = {
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
