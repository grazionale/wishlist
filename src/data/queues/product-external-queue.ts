import RabbitmqServer from '../../main/config/setup-rabbitmq'
import { makeProductService } from '../../main/factories/services/product-service-factory'

export default (server: RabbitmqServer): void => {
  const productServide = makeProductService()

  const updateProduct = async (message): Promise<void> => {
    try {
      await productServide.update(JSON.parse(message.content.toString()))
    } catch (error) {
      console.log(error)
    }
  }

  server.start().then(async () => {
    await server.consume('product-external', updateProduct)
  }).catch(err => {
    console.log(err)
  })
}
