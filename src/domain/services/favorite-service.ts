import { Client } from '../entities/client'
import { Product } from '../entities/product'

export interface IFavoriteService {
  index: (clientId: number) => Promise<IFavoriteService.IndexResult[]>
  show: (favoriteId: string) => Promise<IFavoriteService.ShowResult>
  create: (favorite: IFavoriteService.CreateParams) => Promise<IFavoriteService.CreateResult>
  delete: (favoriteId: number) => Promise<string>
}

export namespace IFavoriteService {
  export type IndexResult = {
    id: number
    product: Product
    client: Client
  }

  export type ShowResult = {
    id: number
    product: Product
    client: Client
  }

  export type CreateParams = {
    externalProductId: string
    clientId: number
  }

  export type CreateResult = {
    id: number
    productId: number
    clientId: number
  }
}
