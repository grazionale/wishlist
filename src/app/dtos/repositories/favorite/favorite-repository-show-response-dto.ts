import { Client } from '../../../entities/client'
import { Product } from '../../../entities/product'

export default interface IFavoriteShowResponseDTO {
  id: number
  product: Product
  client: Client
}
