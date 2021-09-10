import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm'
import { Favorite } from '../../app/entities/favorite'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @Column()
  name: string

  @Index({ unique: true })
  @Column()
  email: string

  @OneToMany(() => Favorite, favorite => favorite.client)
  favorites: Favorite[]
}
