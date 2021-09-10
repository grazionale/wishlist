import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Product } from '../../domain/entities/product'
import { Client } from './client'

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'product_id' })
  productId: number

  @Column({ name: 'client_id' })
  clientId: number

  @ManyToOne(() => Client, client => client.favorites)
  @JoinColumn({ name: 'client_id' })
  client: Client

  @ManyToOne(() => Product, product => product.favorites)
  @JoinColumn({ name: 'product_id' })
  product: Product
}
