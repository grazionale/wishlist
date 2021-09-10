export interface IProductService {
  create: (product: IProductService.CreateParams) => Promise<IProductService.CreateResult>
  update: (product: IProductService.UpdateParams) => Promise<IProductService.UpdateResult>
}

export namespace IProductService {
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
