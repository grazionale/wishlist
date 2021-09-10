import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Favorite } from '../../app/entities/favorite'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'integration_id', unique: true })
  integrationId: string

  @Column()
  title: string

  @Column({ type: 'decimal' })
  price: number

  @Column()
  image: string

  @OneToMany(() => Favorite, favorite => favorite.client)
  favorites: Favorite[]
}
