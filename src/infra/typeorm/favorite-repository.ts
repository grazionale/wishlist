import { getRepository, Repository } from 'typeorm'
import { Favorite } from '../../domain/entities/favorite'
import { IFavoriteRepository } from '../../infra/repositories/favorite-repository'

class FavoriteRepository implements IFavoriteRepository {
  private readonly ormRepository: Repository<Favorite>

  constructor () {
    this.ormRepository = getRepository(Favorite)
  }

  public async index (clientId: number): Promise<IFavoriteRepository.IndexResult[]> {
    const listOfFavorites = await this.ormRepository.find({
      relations: ['client', 'product'],
      where: { clientId: clientId }
    })

    return listOfFavorites
  }

  public async show (favoriteId: string): Promise<IFavoriteRepository.ShowResult | undefined> {
    const favorite = await this.ormRepository.findOne({
      relations: ['client', 'product'],
      where: { id: favoriteId }
    })

    return favorite
  }

  public async verifyAlreadyExists (clientId: number, productId: number): Promise<boolean> {
    const favorite = await this.ormRepository.findOne({
      clientId: clientId,
      productId: productId
    })

    return !!favorite
  }

  public async create (favorite: IFavoriteRepository.CreateParams): Promise<IFavoriteRepository.CreateResult> {
    const favoriteSaved = await this.ormRepository.save(favorite)

    return favoriteSaved
  }

  public async delete (favoriteId: number): Promise<string> {
    await this.ormRepository.delete(favoriteId)
    return 'Favorite successfully deleted'
  }
}

export default FavoriteRepository
