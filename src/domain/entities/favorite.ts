import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Client } from './client'
import { Product } from './product'

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
