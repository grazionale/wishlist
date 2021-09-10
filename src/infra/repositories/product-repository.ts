export interface IProductRepository {
  findByIntegrationId: (integrationId: string) => Promise<IProductRepository.FindByIntegrationIdResult | undefined>
  create: (product: IProductRepository.CreateParams) => Promise<IProductRepository.CreateResult>
  update: (product: IProductRepository.UpdateParams) => Promise<IProductRepository.UpdateResult>
}

export namespace IProductRepository {
  export type FindByIntegrationIdResult = {
    id: number
    integrationId: string
    title: string
    price: number
    image: string
  }

  export type CreateParams = {
    integrationId: string
    title: string
    price: number
    image: string
  }

  export type CreateResult = {
    id: number
    integrationId: string
    title: string
    price: number
    image: string
  }

  export type UpdateParams = {
    id: number
    integrationId: string
    title: string
    price: number
    image: string
  }

  export type UpdateResult = {
    id: number
    integrationId: string
    title: string
    price: number
    image: string
  }
}
