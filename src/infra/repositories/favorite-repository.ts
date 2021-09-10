import { Client } from '../../domain/entities/client'
import { Product } from '../../domain/entities/product'

export interface IFavoriteRepository {
  index: (clientId: number) => Promise<IFavoriteRepository.IndexResult[]>
  show: (favoriteId: string) => Promise<IFavoriteRepository.ShowResult | undefined>
  verifyAlreadyExists: (clientId: number, productId: number) => Promise<boolean>
  create: (favorite: IFavoriteRepository.CreateParams) => Promise<IFavoriteRepository.CreateResult>
  delete: (favoriteId: number) => Promise<string>
}

export namespace IFavoriteRepository {
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
    productId: number
    clientId: number
  }

  export type CreateResult = {
    id: number
    productId: number
    clientId: number
  }
}
